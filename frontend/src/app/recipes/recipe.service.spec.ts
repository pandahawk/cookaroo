import {describe} from 'vitest';
import {Recipe, RecipeService} from './recipe.service';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

describe('RecipeService', () => {
  let service: RecipeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecipeService,
        provideHttpClient(),        // replaces HttpClientModule
        provideHttpClientTesting(),// replaces HttpClientTestingModule
      ],
    });
    service = TestBed.inject(RecipeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadRecipes() should return early when already loading', () => {
    // force loading = true
    (service as any).loading.set(true);

    service.loadRecipes();

    // no HTTP request should be made
    httpMock.expectNone('http://localhost:8080/api/v1/recipes');
    expect(service.loading()).toBe(true);
  });

  it('loadRecipes() should fetch recipe-list and update signals on success', () => {
    const mockRecipes: Recipe[] = [
      {
        id: '1',
        title: 'Test',
        description: 'desc',
        difficulty: 'EASY',
        ingredients: [],
        steps: [],
        servings: 2,
      },
    ];

    // initial state
    expect(service.loading()).toBe(false);
    expect(service.homeMode()).toBe(true);

    service.loadRecipes();

    // loading flag set
    expect(service.loading()).toBe(true);

    const req = httpMock.expectOne('http://localhost:8080/api/v1/recipes');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('X-API-KEY')).toBe('dingding');

    // respond with data -> triggers `next` + `complete`
    req.flush(mockRecipes);

    // signals updated
    expect(service.recipes()).toEqual(mockRecipes);
    expect(service.homeMode()).toBe(false); // set in complete()
    expect(service.loading()).toBe(false);  // set in complete()
  });

  it('loadRecipes() should log error and clear loading on failure', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    service.loadRecipes();
    const req = httpMock.expectOne('http://localhost:8080/api/v1/recipes');

    req.flush('boom', { status: 500, statusText: 'Server Error' });

    expect(logSpy).toHaveBeenCalledWith(
      'Failed to load recipe-list',
      expect.anything(),
    );
    expect(service.loading()).toBe(true);
    expect(service.homeMode()).toBe(true);// from complete()
    logSpy.mockRestore();
  });


  it('loadRecipeById() should log error on failure', () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    service.loadRecipeById('99');

    const req = httpMock.expectOne(
      'http://localhost:8080/api/v1/recipes/99',
    );
    req.flush('not found', { status: 404, statusText: 'Not Found' });

    expect(errSpy).toHaveBeenCalledWith(
      'Failed to load recipe',
      expect.anything(),
    );
    errSpy.mockRestore();
  });

  it('loadRecipeById() should get data on success', () => {
    const id = 'abcd1234';

    const mockRecipe: Recipe = {
      id,
      title: 'Detail',
      description: 'desc',
      difficulty: 'EASY',
      ingredients: [],
      steps: [],
      servings: 2,
    };

    service.loadRecipeById(id);

    const req = httpMock.expectOne(
      `http://localhost:8080/api/v1/recipes/${id}`,
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('X-API-KEY')).toBe('dingding');

    // simulate backend response
    req.flush(mockRecipe);

    // signal should now be updated
    expect(service.selectedRecipe()).toEqual(mockRecipe);
  });

})
