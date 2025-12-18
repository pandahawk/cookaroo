import {Component, computed, inject, signal} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {Router} from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {Category, Difficulty, Recipe} from '../recipe.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-recipe-create',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './recipe-create.html',
  styleUrl: './recipe-create.scss',
})
export class RecipeCreate {

  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly difficultyOptions = Object.values(Difficulty);
  readonly categoryOptions = Object.values(Category);

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    difficulty: this.fb.nonNullable.control<Difficulty>(
      Difficulty.EASY,
      Validators.required,
    ),
    category: this.fb.nonNullable.control<Category[]>([]),
    servings: [2, [Validators.required, Validators.min(1)]],
    ingredients: this.fb.nonNullable.array<FormControl<string>>([
      this.fb.nonNullable.control('', Validators.required),
    ]),
    steps: this.fb.nonNullable.array<FormControl<string>>([
      this.fb.nonNullable.control('', Validators.required),
    ]),
  });

  get ingredients(): FormArray<FormControl<string>> {
    return this.form.controls.ingredients;
  }

  get steps(): FormArray<FormControl<string>> {
    return this.form.controls.steps;
  }

  get titleCtrl() {
    return this.form.controls.title;
  }

  get descriptionCtrl() {
    return this.form.controls.description;
  }

  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);

  private readonly formStatus =
    toSignal(this.form.statusChanges, {initialValue: this.form.status})

  readonly canSubmit = computed(() =>
    this.formStatus() === 'VALID' && !this.isSubmitting()
  );

  addIngredient(): void {
    this.ingredients.push(
      this.fb.nonNullable.control('', Validators.required),
    );
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }


  addStep(): void {
    this.steps.push(
      this.fb.nonNullable.control('', Validators.required),
    );
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  onSubmit () {
    if (!this.canSubmit) {
      this.form.markAsTouched();
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    const raw = this.form.getRawValue();

    const payload: Omit<Recipe, 'id'> = {
      category: raw.category,
      description: raw.description,
      difficulty: raw.difficulty,
      ingredients: raw.ingredients,
      servings: raw.servings,
      steps: raw.steps,
      title: raw.title,
    }

    this.recipeService.createRecipe(payload)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/recipes']);
        },
        error: err => {
          console.error('Create failed in component:', err);
          this.submitError.set('Rezept konnte nicht erstellt werden.');
        },
      });
  }

  onCancel () {
    this.router.navigate(['/recipes']);
  }

}
