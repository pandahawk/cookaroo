import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeDetail} from './recipe-detail';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {Recipe} from '../recipes/recipe.service';
import {vi} from 'vitest';
import {signal, WritableSignal} from '@angular/core';

describe('RecipeDetail', () => {
  let component: RecipeDetail;
  let fixture: ComponentFixture<RecipeDetail>;

  let recipeServiceMock: {
    selectedRecipe: WritableSignal<Recipe | null>;
    loadRecipeById: ReturnType<typeof vi.fn>;
  };

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
    };


    await TestBed.configureTestingModule({
      imports: [RecipeDetail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({id: 'abcd1234'}), // or whatever id
            },
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(RecipeDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the recipe details', () => {

    const host: HTMLElement = fixture.nativeElement;

    fixture.componentInstance.recipe.set(testRecipe)
    fixture.detectChanges();

    // @if(recipe()) block → mat-card exists
    const card = host.querySelector('.recipe-detail-card');
    expect(card).toBeTruthy();
  });


});
