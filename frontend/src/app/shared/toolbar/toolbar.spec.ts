import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Toolbar} from './toolbar';
import {Router} from '@angular/router';
import {expect} from 'vitest';
import {RecipeService} from '../../recipes/recipe.service';

describe('Toolbar', () => {
  let component: Toolbar;
  let fixture: ComponentFixture<Toolbar>;

  let recipeServiceMock: {
    loadRecipeList: ReturnType<typeof vi.fn>,
    goHome: ReturnType<typeof vi.fn>
  };
  let routerMock: {
    navigate: ReturnType<typeof vi.fn>
  };

  beforeEach(async () => {
    recipeServiceMock = {
      loadRecipeList: vi.fn(),
      goHome: vi.fn(),
    };
    routerMock = {
      navigate: vi.fn(),
    }
    await TestBed.configureTestingModule({
      imports: [Toolbar],
      providers: [
        // {
        //   provide: ActivatedRoute,
        //   useValue: {}
        // },
        {provide: Router, useValue: routerMock},
        {provide: RecipeService, useValue: recipeServiceMock},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Toolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onRecipesClick() should call the service method and navigate to the recipe page', () => {
    recipeServiceMock.loadRecipeList.mockReturnValue(Promise.resolve([]));
    component.onRecipesClick();

    fixture.detectChanges();

    expect(recipeServiceMock.loadRecipeList).toBeCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/recipes']);
  });

  it('onHomeClick() should call the service method and navigate to the home' +
    ' page', () => {

    recipeServiceMock.goHome.mockReturnValue(Promise.resolve([]));

    component.onHomeClick();

    expect(recipeServiceMock.goHome).toBeCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
