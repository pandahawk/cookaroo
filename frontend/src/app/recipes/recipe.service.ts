import {Injectable, signal} from '@angular/core';
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
  loading = signal(false);

  private readonly apiUrl = 'http://localhost:8080/api/v1/recipes';
  private readonly apiKey = 'dingding'; // later we can move this to environment.ts

  constructor(private readonly http: HttpClient) {
  }

  listRecipes() {
    this.loading.set(true);

    setTimeout(()=> {
      const headers = new HttpHeaders({'X-API-KEY': this.apiKey});

      this.http.get<Recipe[]>(this.apiUrl, {headers}).subscribe({
        next: data => {
          this.recipes.set(data);
          console.log('recipes received', data);
          this.loading.set(false);
        },
        error: (err) => {
          console.log('Failed to load recipes', err);
          this.loading.set(false);
        },
      });
    },2000);


  }
}
