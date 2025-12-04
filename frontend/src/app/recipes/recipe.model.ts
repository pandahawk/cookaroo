export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export enum Category {
  MEAT = 'MEAT',
  FISH = 'FISH',
  VEGGI = 'VEGGI',
  RICE = 'RICE',
  PASTA = 'PASTA',
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  ingredients: string[];
  steps: string[];
  servings: number;
  category: Category[];
}

export interface CreateRecipeRequest {
  title: string;
  description: string;
  difficulty: Difficulty;
  ingredients: string[];
  steps: string[];
  servings: number;
  category: Category[];
}

export interface UpdateRecipeRequest {
  title?: string;
  description?: string;
  difficulty?: Difficulty;
  ingredients?: string[];
  steps?: string[];
  servings?: number;
  category?: Category[];
}
