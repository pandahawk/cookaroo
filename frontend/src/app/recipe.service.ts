import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

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
  private readonly apiUrl = 'http://localhost:8080/api/v1/recipes';
  private readonly apiKey = 'dingding'; // later we can move this to environment.ts

  constructor(private readonly http: HttpClient) {
  }

  listRecipes(): Observable<Recipe[]> {
    const headers = new HttpHeaders({'X-API-KEY': this.apiKey});
    return this.http.get<Recipe[]>(this.apiUrl, {headers});
  }


}
