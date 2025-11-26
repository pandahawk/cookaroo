import { Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  ingredients: string[];
  steps: string[];
  servings: number;
}

@Injectable({
  providedIn: 'root',
})

export class RecipeService {

  recipes = signal<Recipe[]>([]);
  homeMode = signal(true);
  loading = signal(false);
  selectedRecipe = signal<Recipe | null>(null);


  private readonly apiUrl = 'http://localhost:8080/api/v1/recipes';
  private readonly apiKey = 'dingding'; // later we can move this to environment.ts

  constructor(private readonly http: HttpClient) {
  }

  loadRecipes() {
    if (this.loading()) return;
    this.loading.set(true);

      const headers = new HttpHeaders({'X-API-KEY': this.apiKey});

      this.http.get<Recipe[]>(this.apiUrl, {headers}).subscribe({
        next: data => {
          this.recipes.set(data);
          console.log('recipes received', data);
        },
        error: (err) => {
          console.log('Failed to load recipes', err);
        },
        complete: () => {
          this.homeMode.set(false);
          this.loading.set(false);
        },
      });
  }

  loadRecipe(id: string) {
    this.selectedRecipe.set(null);
    const headers = new HttpHeaders({'X-API-KEY': this.apiKey});
    this.http.get<Recipe>(`${this.apiUrl}/${id}`, {headers}).subscribe({
      next: data => {this.selectedRecipe.set(data);},
      error: err =>  console.error('Failed to load recipe', err)
    });
  }

  goHome() {
    this.homeMode.set(true);
  }
}
