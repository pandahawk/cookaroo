import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeList} from './recipe-list';
import {expect} from 'vitest';
import {Router} from '@angular/router';
import {Recipe, RecipeService} from '../recipe.service';
import {By} from '@angular/platform-browser';

describe('RecipeList', () => {
  let component: RecipeList;
  let fixture: ComponentFixture<RecipeList>;

  let recipeServiceMock: {
    recipes: ReturnType<typeof vi.fn>;
    homeMode: ReturnType<typeof vi.fn>;
  };

  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    recipeServiceMock = {
      recipes: vi.fn(),
      homeMode: vi.fn(),
    };

    routerMock = {navigate: vi.fn()}


    await TestBed.configureTestingModule({
      imports: [RecipeList],
      providers: [
        {provide: Router, useValue: routerMock},
        {provide: RecipeService, useValue: recipeServiceMock},
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(RecipeList);
    component = fixture.componentInstance;
    // await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load() should call recipe-list on the recipeService', () => {
    component.load()
    expect(recipeServiceMock.recipes).toHaveBeenCalled();
  });

  it('onRecipeClick() navigates to /recipe-list/:id', () => {
    const r: Recipe = {
      id: 'abcd1234',
      title: 'test',
      difficulty: 'EASY',
      ingredients: [],
      steps: [],
      description: 'test desc',
      servings: 4,
    };
    component.onRecipeClick(r);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/recipe-list', r.id]);
  });


  it('shows empty state when in homeMode', () => {
    recipeServiceMock.homeMode.mockReturnValue(true);
    recipeServiceMock.recipes.mockReturnValue([]);
    fixture.detectChanges();

    const emptyState = fixture.debugElement.query(By.css('.empty-state'));
    const grid = fixture.debugElement.query(By.css('.recipe-grid'));

    expect(emptyState).toBeTruthy();
    expect(grid).toBeNull();

  });

  it('renders recipe cards when not in homeMode', () => {
    const r: Recipe = {
      id: 'abcd1234',
      title: 'test',
      difficulty: 'EASY',
      ingredients: [],
      steps: [],
      description: 'test desc',
      servings: 4,
    };
    recipeServiceMock.homeMode.mockReturnValue(false);
    recipeServiceMock.recipes.mockReturnValue([r]);
    fixture.detectChanges();


    const buttons = fixture.debugElement.queryAll(
      By.css('.recipe-card-button')
    );
    expect(buttons.length).toBe(1);

    const titleEl = buttons[0].query(By.css('mat-card-title')).nativeElement;
    expect(titleEl.textContent.trim()).toBe('test');
  });

  it('calls onRecipeClick when a card is clicked', () => {
    const r: Recipe = {
      id: 'abcd1234',
      title: 'test',
      difficulty: 'EASY',
      ingredients: [],
      steps: [],
      description: 'test desc',
      servings: 4,
    };
    recipeServiceMock.homeMode.mockReturnValue(false);
    recipeServiceMock.recipes.mockReturnValue([r]);
    const spy = vi.spyOn(component, 'onRecipeClick');
    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('.recipe-card-button'));

    button.triggerEventHandler('click');

    expect(routerMock.navigate).toHaveBeenCalledWith(['/recipe-list', r.id])
    expect(spy).toHaveBeenCalledWith(r);

  })
});
