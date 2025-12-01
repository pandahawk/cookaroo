import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeList} from './recipe-list';
import {Recipe, RecipeService} from '../recipe.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ConfirmDialog} from '../confirm-dialog/confirm-dialog';
import {of} from 'rxjs';

describe('RecipeList', () => {
  let component: RecipeList;
  let fixture: ComponentFixture<RecipeList>;

  let recipeServiceMock: {
    loadRecipeList: ReturnType<typeof vi.fn>;
    deleteRecipe: ReturnType<typeof vi.fn>;
    recipes: ReturnType<typeof vi.fn>;
  }
  let dialogMock: { open: ReturnType<typeof vi.fn>; }
  let routerMock: { navigate: ReturnType<typeof vi.fn> }


  beforeEach(async () => {

    recipeServiceMock = {
      loadRecipeList: vi.fn(),
      deleteRecipe: vi.fn(),
      recipes: vi.fn().mockReturnValue([]),
    };
    dialogMock = {open: vi.fn()};
    routerMock = {navigate: vi.fn()};

    await TestBed.configureTestingModule({
      imports: [RecipeList],
      providers: [
        {provide: RecipeService, useValue: recipeServiceMock},
        {provide: MatDialog, useValue: dialogMock},
        {provide: Router, useValue: routerMock},
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

  it('should navigate to recipes/{mongoId} when clicking on a card', () => {
    const testrecipe = {id: 'abcd1234', title: 'test title'} as Recipe;
    component.onRecipeClick(testrecipe);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/recipes', testrecipe.id])
  })

  it('renders recipes from the service', () => {
    recipeServiceMock.recipes.mockReturnValue([
      { id: '1', title: 'Pizza', description: 'Yum' } as Recipe,
    ]);

    fixture.detectChanges();

    const titles = fixture.nativeElement.querySelectorAll('mat-card-title');
    expect(titles.length).toBe(1);
    expect(titles[0].textContent).toContain('Pizza');
  });


  it('clicking delete button calls deleteRecipe', () => {
    const recipe = { id: '1', title: 'Pizza', description: 'Yum' } as any;
    recipeServiceMock.recipes.mockReturnValue([recipe]);
    dialogMock.open.mockReturnValue({
      afterClosed: () => of(true)
    })
    fixture.detectChanges();

    const deleteButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('button.screen-button:last-of-type');

    deleteButton.click();

    expect(dialogMock.open).toHaveBeenCalled(); // or spy on component.deleteRecipe
  });

});
