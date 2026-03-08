import {Component, OnInit} from '@angular/core';
import {Category, Difficulty} from '../recipe.model';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-create',
  imports: [],
  templateUrl: './recipe-create.html',
  styleUrl: './recipe-create.scss',
})
export class RecipeCreate implements OnInit {
  readonly difficultyOptions: Difficulty[];
  readonly categoryOptions: Category[];

  form!: FormGroup;
  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess = false;

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required], Validators.minLength(1)],
      difficulty: [Difficulty.EASY, [Validators.required]],
      category: this.fb.control<Category[]>([], [Validators.required, Validators.minLength(1)]),
      ingredients: this.fb.array([this.fb.control('', [Validators.required, Validators.minLength(1)])]),
      steps: this.fb.array([this.fb.control('', [Validators.required, Validators.minLength(1)])]),
      servings: [1, [Validators.required, Validators.min(1)]],
    });
  }

  get ingredientsArray() {
    return this.form.get('ingredients') as FormArray<FormControl<string>>;
  }

  get stepsArray() {
    return this.form.get('steps') as FormArray<FormControl<string>>;
  }

  addIngredient() {
    this.ingredientsArray.push(
      this.fb.nonNullable.control('', [Validators.required, Validators.minLength(1)]));
  }

  removeIngredient(index: number) {
    if (this.ingredientsArray.length <= 1) return;
    this.ingredientsArray.removeAt(index);
  }

  addStep(): void {
    this.stepsArray.push(
      this.fb.nonNullable.control('', [Validators.required, Validators.minLength(1)]));
  }

  removeStep(index: number): void {
    if (this.stepsArray.length <= 1) return;
    this.stepsArray.removeAt(index);
  }

}
