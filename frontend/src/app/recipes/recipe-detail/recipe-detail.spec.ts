import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeDetail} from './recipe-detail';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {Recipe, RecipeService} from '../recipe.service';
import {vi} from 'vitest';
import {signal, WritableSignal} from '@angular/core';
import {of} from 'rxjs';
import {ConfirmDialog} from '../confirm-dialog/confirm-dialog';
import {MatDialog} from '@angular/material/dialog';

describe('RecipeDetail', () => {
  let component: RecipeDetail;
  let fixture: ComponentFixture<RecipeDetail>;

  let recipeServiceMock: {
    selectedRecipe: WritableSignal<Recipe | null>;
    loadRecipeById: ReturnType<typeof vi.fn>;
    deleteRecipe: ReturnType<typeof vi.fn>;
  };
  let dialogMock: { open: ReturnType<typeof vi.fn>; };

  const testRecipe: Recipe = {
    id: 'abcd1234',
    title: 'Spaghetti Carbonara',
    difficulty: 'EASY',
    description: 'Yummy pasta',
    servings: 2,
    ingredients: ['Spaghetti', 'Eggs', 'Bacon'],
    steps: ['Boil pasta', 'Fry bacon', 'Mix everything'],
  };


  beforeEach(async () => {
    recipeServiceMock = {
      selectedRecipe: signal<Recipe | null>(testRecipe),
      loadRecipeById: vi.fn(),
      deleteRecipe: vi.fn(),
    };
    dialogMock = {open: vi.fn()};

    await TestBed.configureTestingModule({
      imports: [RecipeDetail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({id: 'abcd1234'}), // or whatever mongoId
            },
          },
        },
        {provide: RecipeService, useValue: recipeServiceMock},
        {provide: MatDialog, useValue: dialogMock},
  ],
    }).compileComponents();
    fixture = TestBed.createComponent(RecipeDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open confirm dialog and delete recipe when confirmed', () => {
    const testrecipe = {id: 'abcd1234', title: 'test title'} as Recipe;
    dialogMock.open.mockReturnValue({
      afterClosed: () => of(true)
    })
    component.deleteRecipe(testrecipe);

    expect(dialogMock.open).toHaveBeenCalledWith(ConfirmDialog, {
      width: '360px',
      data: {
        title: 'Rezept löschen',
        message: 'Möchtest du "test title" wirklich löschen?',
      },
    });
    expect(recipeServiceMock.deleteRecipe).toHaveBeenCalledWith('abcd1234');
  });

});
