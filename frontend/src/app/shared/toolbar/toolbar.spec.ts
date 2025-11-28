import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Toolbar } from './toolbar';
import {Router} from '@angular/router';
import {RecipeService} from '../../recipes/recipe.service';
import {By} from '@angular/platform-browser';

describe('Toolbar', () => {
  let component: Toolbar;
  let fixture: ComponentFixture<Toolbar>;

  // simple mocks for the dependencies
  let recipeServiceMock: {
    loadRecipes: ReturnType<typeof vi.fn>;
    goHome: ReturnType<typeof vi.fn>;
    loading: ReturnType<typeof vi.fn>;
  };

  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    recipeServiceMock = {
      loadRecipes: vi.fn(),
      goHome: vi.fn(),
      // your real service probably returns a signal() here,
      // for the component we just care that it's called + its value
      loading: vi.fn().mockReturnValue(false),
    };

    routerMock = {
      navigate: vi.fn(),
    };


    await TestBed.configureTestingModule({
      imports: [Toolbar],
      providers: [
        { provide: RecipeService, useValue: recipeServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Toolbar);
    component = fixture.componentInstance;
    // await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load() should navigate to /recipe-list and call loadRecipes on the service', () => {
    component.load();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/recipe-list']);
    expect(recipeServiceMock.loadRecipes).toHaveBeenCalled();
  });

  it('goHome() should navigate to /recipe-list and call goHome on the' +
    ' service', () => {
    component.goHome();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/recipe-list']);
    expect(recipeServiceMock.goHome).toHaveBeenCalled();
  });

  it('clicking the logo container calls goHome()', () => {
    const goHomeSpy = vi.spyOn(component, 'goHome');

    fixture.detectChanges();
    const logoDe = fixture.debugElement.query(By.css('.logo-container'));
    logoDe.triggerEventHandler('click', {});

    expect(goHomeSpy).toHaveBeenCalled();
  });

  it('clicking the recipe button calls load()', () => {
    const loadSpy = vi.spyOn(component, 'load');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.nav-button'));
    button.triggerEventHandler('click', {});

    expect(loadSpy).toHaveBeenCalled();
  });

  it('shows "Rezepte" and enables button when not loading', () => {
    recipeServiceMock.loading.mockReturnValue(false);
    fixture.detectChanges();

    const buttonEl: HTMLButtonElement =
      fixture.debugElement.query(By.css('button.nav-button')).nativeElement;

    expect(buttonEl.disabled).toBe(false);
    expect(buttonEl.textContent).toContain('Rezepte');
  });

  it('shows "Laden…" and disables button when loading', () => {
    recipeServiceMock.loading.mockReturnValue(true);
    fixture.detectChanges();

    const buttonEl: HTMLButtonElement =
      fixture.debugElement.query(By.css('button.nav-button')).nativeElement;

    expect(buttonEl.disabled).toBe(true);
    expect(buttonEl.textContent).toContain('Laden');
  });

  it('pressing enter on logo container calls goHome()', () => {
    const goHomeSpy = vi.spyOn(component, 'goHome');

    fixture.detectChanges();
    const logoDe = fixture.debugElement.query(By.css('.logo-container'));

    // Keyboard-like event – enough for Angular’s key handling
    const event = { key: 'Enter' } as KeyboardEvent;

    logoDe.triggerEventHandler('keydown.enter', event);


    expect(goHomeSpy).toHaveBeenCalled();
  });

});
