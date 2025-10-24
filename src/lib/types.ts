export type Recipe = {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl: string;
  imageHint: string;
  ingredients: string[];
};

export type UserProfile = {
  healthConditions: string;
  goals: string;
  allergies: string[];
};

export type MealLogEntry = {
  date: string; // YYYY-MM-DD
  recipe: Recipe;
};
