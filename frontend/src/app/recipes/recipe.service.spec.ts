import {describe, expect} from 'vitest';
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

  it('loadRecipeList() should return early when already loading', () => {
    // force loading = true

    service.loadRecipeList();
    expect(service.loading()).toBe(true);

    service.loadRecipeList();
    httpMock.expectOne('http://localhost:8080/api/v1/recipes');
  });

  it('loadRecipeList() should fetch recipe-list and update signals on success', () => {
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

    service.loadRecipeList();

    // loading flag set
    expect(service.loading()).toBe(true);

    const req = httpMock.expectOne('http://localhost:8080/api/v1/recipes');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('X-API-KEY')).toBe('dingding');

    // respond with data -> triggers `next` + `complete`
    req.flush(mockRecipes);

    // signals updated
    expect(service.recipes()).toEqual(mockRecipes);
    expect(service.loading()).toBe(false);  // set in complete()
  });

  it('loadRecipeList() should log error and clear loading on failure', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {
    });

    service.loadRecipeList();
    const req = httpMock.expectOne('http://localhost:8080/api/v1/recipes');
    expect(service.loading()).toBe(true);
    req.flush('boom', {status: 500, statusText: 'Server Error'});

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('RecipeService: Failed to load recipes list.'),
      expect.anything(),
    );
    expect(service.loading()).toBe(false);
    errorSpy.mockRestore();
  });


  it('loadRecipeById() should log error on failure', () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {
    });

    service.loadRecipeById('99');

    const req = httpMock.expectOne(
      'http://localhost:8080/api/v1/recipes/99',
    );
    req.flush('not found', {status: 404, statusText: 'Not Found'});

    expect(errSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to load recipe'),
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

  it('goHome() should set selected recipe and the error to null', () => {

    service.goHome();

    expect(service.error()).toBe(null);
    expect(service.selectedRecipe()).toBe(null);
  });

  it('deleteRecipe(id) should remove recipe from list and clear selected recipe on success', () => {
    const id = 'abcd1234';

    const recipeToDelete = { id, title: 'Delete me' } as Recipe;
    const otherRecipe   = { id: 'zzz', title: 'Keep me' } as Recipe;

    // seed signals for _recipes and _selectedRecipe
    (service as any)._recipes.set([recipeToDelete, otherRecipe]);
    (service as any)._selectedRecipe.set(recipeToDelete);

    service.deleteRecipe(id);

    const req = httpMock.expectOne('http://localhost:8080/api/v1/recipes/abcd1234');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('X-API-KEY')).toBe('dingding');

    // ⬅️ this actually triggers the `next: data => { ... }` block
    req.flush(null, { status: 204, statusText: 'No Content' });

    // recipes signal should now only contain the other recipe
    expect(service.recipes()).toEqual([otherRecipe]);

    // selectedRecipe should have been cleared
    expect(service.selectedRecipe()).toBeNull();
  });

  it('deleteRecipe(id) should set error signal on failure', () => {
    const id = 'abcd1234';

    service.deleteRecipe(id);

    const req = httpMock.expectOne('http://localhost:8080/api/v1/recipes/abcd1234');
    expect(req.request.method).toBe('DELETE');

    // ⬅️ trigger the error callback
    req.flush('Server error', {
      status: 500,
      statusText: 'Server Error',
    });

    expect(service.error()).toBe(`Failed to delete recipe with ID: ${id}.`);
  });

})
