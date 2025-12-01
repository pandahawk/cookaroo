import {Injectable, signal, Signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {finalize} from 'rxjs';

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

  private readonly _recipes =  signal<Recipe[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _selectedRecipe = signal<Recipe | null>(null);

  public readonly recipes: Signal<Recipe[]> = this._recipes.asReadonly();
  public readonly loading: Signal<boolean> = this._loading.asReadonly();
  public readonly selectedRecipe: Signal<Recipe | null> = this._selectedRecipe.asReadonly();
  public readonly error: Signal<string | null> = this._error.asReadonly();

  private readonly apiUrl = 'http://localhost:8080/api/v1/recipes';
  // Best practice: Use an interceptor for API keys, but keeping it here for simplicity
  private readonly apiKey = 'dingding';

  constructor(private readonly http: HttpClient) {
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-API-KEY': this.apiKey,
      'Content-Type': 'application/json'
    });
  }

  loadRecipeList(): void {
    if (this._loading()) return;

    this._loading.set(true);
    this._error.set(null);

    this.http.get<Recipe[]>(`${this.apiUrl}`, {headers: this.getHeaders()})
      .pipe(
        finalize(() => this._loading.set(false)),
      )
      .subscribe({
        next: data => {
          this._recipes.set(data);
          console.log('RecipeService: Recipe list loaded successfully', data);
          },
        error: err => {
          console.error('RecipeService: Failed to load recipes list.', err);
          this._error.set('Failed to fetch recipes. Please try again.');
          this._recipes.set([]);
        },
      });
  }

  loadRecipeById(id: string): void {
    this._selectedRecipe.set(null); // Clear previous recipe
    this._error.set(null);

    // NOTE: Tracker logic has been removed. A duplicate request will now proceed.
    this.http.get<Recipe>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: (data) => {
          this._selectedRecipe.set(data);
          console.log(`RecipeService: Recipe ${id} loaded successfully.`, data);
        },
        error: (err) => {
          console.error(`RecipeService: Failed to load recipe ${id}.`, err);
          this._error.set(`Failed to fetch recipe details for ID: ${id}.`);
        }
      });
  }

  deleteRecipe(id: string): void {
    this.http.delete<Recipe>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: () => {
          console.log(`RecipeService: Recipe ${id} deleted successfully.`);
          this._recipes.update(recipes =>
            recipes ? recipes.filter(r => r.id !== id) : []
          );
          const current = this._selectedRecipe();
          if (current?.id === id) {
            this._selectedRecipe.set(null);
          }
        },
        error: err => {
          console.error(`RecipeService: Failed to delete recipe ${id}.`, err);
          this._error.set(`Failed to delete recipe with ID: ${id}.`);
        },
      });
  }

  goHome(): void {
    this._selectedRecipe.set(null);
    this._error.set(null);
    console.log("RecipeService: Selected recipe state cleared.");
  }



}
