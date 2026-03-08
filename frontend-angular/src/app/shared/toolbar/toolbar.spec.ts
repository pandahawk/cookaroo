import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Toolbar} from './toolbar';
import {Router} from '@angular/router';
import {expect, Mock} from 'vitest';
import {RecipeService} from '../../recipes/recipe.service';

describe('Toolbar', () => {
  let component: Toolbar;
  let fixture: ComponentFixture<Toolbar>;

  let recipeServiceMock: {
    loadRecipeList: Mock,
    goHome: Mock,
    loading: () => boolean,
  };
  let routerMock: {
    navigate: ReturnType<typeof vi.fn>
  };

  beforeEach(async () => {

    recipeServiceMock = {
      loadRecipeList: vi.fn(),
      goHome: vi.fn(),
      loading: () => false,
    };
    routerMock = {
      navigate: vi.fn(),
    }
    await TestBed.configureTestingModule({
      imports: [Toolbar],
      providers: [
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
    component.onRecipesClick();

    fixture.detectChanges();

    expect(recipeServiceMock.loadRecipeList).toBeCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/recipes']);
  });

  it('onHomeClick() should call the service method and navigate to the home' +
    ' page', () => {
    component.onHomeClick();

    expect(recipeServiceMock.goHome).toBeCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
