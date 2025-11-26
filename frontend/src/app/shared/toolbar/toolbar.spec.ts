// src/app/shared/toolbar/toolbar.spec.ts

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import {provideRouter, Router} from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';


import { Toolbar } from './toolbar';
import { RecipeService } from '../../recipes/recipe.service';

describe('Toolbar', () => {
  let fixture: ComponentFixture<Toolbar>;
  let component: Toolbar;

  let router: Router;
  let recipeService: RecipeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toolbar],
      providers: [
        provideRouter([]),           // replaces RouterTestingModule
        provideHttpClient(),         // base HttpClient
        provideHttpClientTesting(), // replaces HttpClientTestingModule
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    recipeService = TestBed.inject(RecipeService);

    fixture = TestBed.createComponent(Toolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load() should navigate to /recipes and call loadRecipes on the service', () => {
    const navigateSpy = vi
      .spyOn(router, 'navigate')
      .mockResolvedValue(true as any);
    const loadRecipesSpy = vi
      .spyOn(recipeService, 'loadRecipes')
      .mockReturnValue(undefined as any);

    component.load();

    expect(navigateSpy).toHaveBeenCalledWith(['/recipes']);
    expect(loadRecipesSpy).toHaveBeenCalled();
  });

  it('goHome() should navigate to /recipes and call goHome on the service', () => {
    const navigateSpy = vi
      .spyOn(router, 'navigate')
      .mockResolvedValue(true as any);
    const goHomeSpy = vi
      .spyOn(recipeService, 'goHome')
      .mockReturnValue(undefined as any);

    component.goHome();

    expect(navigateSpy).toHaveBeenCalledWith(['/recipes']);
    expect(goHomeSpy).toHaveBeenCalled();
  });

  it('loading getter should delegate to recipeService.loading()', () => {
    const loadingSpy = vi
      .spyOn(recipeService, 'loading')
      .mockReturnValue(true as any);

    expect(component.loading).toBe(true);
    expect(loadingSpy).toHaveBeenCalled();
  });

  it('clicking the "Rezepte" button calls load()', () => {
    const loadSpy = vi.spyOn(component, 'load');
    fixture.detectChanges();

    const loadButtonDe = fixture.debugElement.query(
      By.css('button.nav-button')
    );
    loadButtonDe.triggerEventHandler('click', {});

    expect(loadSpy).toHaveBeenCalled();
  });
});
