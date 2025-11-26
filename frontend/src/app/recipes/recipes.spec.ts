import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { Router } from '@angular/router';
import { Recipes } from './recipes';
import { RecipeService, Recipe } from './recipe.service';

describe('Recipes', () => {
  let routerMock: { navigate: ReturnType<typeof vi.fn> };
  let recipeServiceMock: {
    recipes: ReturnType<typeof vi.fn>;
    homeMode: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    routerMock = {
      navigate: vi.fn(),
    };

    recipeServiceMock = {
      recipes: vi.fn().mockReturnValue([]), // default empty list
      homeMode: vi.fn().mockReturnValue(false),
    };

    await TestBed.configureTestingModule({
      imports: [Recipes], // standalone component
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: RecipeService, useValue: recipeServiceMock },
      ],
    }).compileComponents();
  });

  function createComponent(): ComponentFixture<Recipes> {
    const fixture = TestBed.createComponent(Recipes);
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    const fixture = createComponent();
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('recipes getter should delegate to recipeService.recipes()', () => {
    const mockRecipes: Recipe[] = [
      {
        id: '1',
        title: 'Test recipe',
        description: 'desc',
        difficulty: 'EASY' as any,
        ingredients: [],
        steps: [],
        servings: 2,
      } as Recipe,
    ];
    recipeServiceMock.recipes.mockReturnValue(mockRecipes);

    const fixture = createComponent();
    const component = fixture.componentInstance;

    const result = component.recipes;

    expect(recipeServiceMock.recipes).toHaveBeenCalled();
    expect(result).toBe(mockRecipes);
  });

  it('homeMode getter should delegate to recipeService.homeMode()', () => {
    recipeServiceMock.homeMode.mockReturnValue(true);

    const fixture = createComponent();
    const component = fixture.componentInstance;

    const result = component.homeMode;

    expect(recipeServiceMock.homeMode).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('load() should call recipeService.recipes()', () => {
    const fixture = createComponent();
    const component = fixture.componentInstance;

    component.load();

    expect(recipeServiceMock.recipes).toHaveBeenCalled();
  });

  it('onRecipeClick should navigate to the recipe detail page', () => {
    const fixture = createComponent();
    const component = fixture.componentInstance;

    const recipe: Recipe = {
      id: '42',
      title: 'Detail',
      description: 'desc',
      difficulty: 'EASY' as any,
      ingredients: [],
      steps: [],
      servings: 1,
    } as Recipe;

    component.onRecipeClick(recipe);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/recipes', '42']);
  });
});
