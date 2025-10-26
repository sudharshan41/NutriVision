import type { Recipe, MealLogEntry } from './types';

export const recipes: Recipe[] = [
  {
    id: 'grilled-salmon-salad',
    name: 'Grilled Salmon Salad',
    description: 'A light and nutritious salad with omega-3 rich salmon, mixed greens, cherry tomatoes, and a lemon vinaigrette.',
    calories: 450,
    protein: 35,
    carbs: 15,
    fat: 28,
    imageUrl: 'https://picsum.photos/seed/101/600/400',
    imageHint: 'salmon salad',
    ingredients: ['Salmon fillet', 'Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Lemon', 'Olive oil'],
  },
  {
    id: 'quinoa-bowl',
    name: 'Vibrant Quinoa Bowl',
    description: 'A colorful and complete protein bowl with quinoa, black beans, corn, avocado, and a cilantro-lime dressing.',
    calories: 550,
    protein: 20,
    carbs: 70,
    fat: 22,
    imageUrl: 'https://picsum.photos/seed/102/600/400',
    imageHint: 'quinoa bowl',
    ingredients: ['Quinoa', 'Black beans', 'Corn', 'Avocado', 'Red onion', 'Cilantro', 'Lime'],
  },
  {
    id: 'chicken-stir-fry',
    name: 'Veggie-Packed Chicken Stir-fry',
    description: 'A quick and easy stir-fry with lean chicken breast, broccoli, bell peppers, and carrots in a savory ginger-soy sauce.',
    calories: 400,
    protein: 30,
    carbs: 35,
    fat: 15,
    imageUrl: 'https://picsum.photos/seed/103/600/400',
    imageHint: 'chicken stir-fry',
    ingredients: ['Chicken breast', 'Broccoli', 'Bell peppers', 'Carrots', 'Soy sauce', 'Ginger'],
  },
  {
    id: 'avocado-toast',
    name: 'Classic Avocado Toast',
    description: 'Simple yet satisfying avocado toast on whole-wheat bread, topped with red pepper flakes and a squeeze of lime.',
    calories: 300,
    protein: 10,
    carbs: 30,
    fat: 18,
    imageUrl: 'https://picsum.photos/seed/104/600/400',
    imageHint: 'avocado toast',
    ingredients: ['Whole-wheat bread', 'Avocado', 'Red pepper flakes', 'Lime', 'Salt', 'Pepper'],
  },
  {
    id: 'lentil-soup',
    name: 'Hearty Lentil Soup',
    description: 'A warming and fiber-rich soup made with lentils, carrots, celery, and onions. Perfect for a cold day.',
    calories: 350,
    protein: 18,
    carbs: 60,
    fat: 5,
    imageUrl: 'https://picsum.photos/seed/105/600/400',
    imageHint: 'lentil soup',
    ingredients: ['Lentils', 'Carrots', 'Celery', 'Onion', 'Vegetable broth', 'Thyme'],
  },
  {
    id: 'greek-yogurt-parfait',
    name: 'Berry Yogurt Parfait',
    description: 'A layered parfait with protein-packed Greek yogurt, mixed berries, and a sprinkle of crunchy granola.',
    calories: 320,
    protein: 22,
    carbs: 40,
    fat: 8,
    imageUrl: 'https://picsum.photos/seed/106/600/400',
    imageHint: 'yogurt parfait',
    ingredients: ['Greek yogurt', 'Mixed berries', 'Granola', 'Honey'],
  },
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    description: 'A savory chicken and rice dish that includes layers of chicken, rice, and aromatics that are steamed together.',
    calories: 600,
    protein: 30,
    carbs: 65,
    fat: 25,
    imageUrl: 'https://picsum.photos/seed/107/600/400',
    imageHint: 'chicken biryani',
    ingredients: ['Basmati rice', 'Chicken', 'Yogurt', 'Onion', 'Spices', 'Saffron'],
  },
  {
    id: 'palak-paneer',
    name: 'Palak Paneer',
    description: 'A vegetarian dish consisting of paneer (a type of cottage cheese) in a thick paste made from puréed spinach.',
    calories: 450,
    protein: 20,
    carbs: 15,
    fat: 35,
    imageUrl: 'https://picsum.photos/seed/108/600/400',
    imageHint: 'palak paneer',
    ingredients: ['Spinach', 'Paneer', 'Onion', 'Tomato', 'Garlic', 'Spices'],
  },
  {
    id: 'dal-makhani',
    name: 'Dal Makhani',
    description: 'A creamy and buttery lentil dish made with black lentils and red kidney beans.',
    calories: 500,
    protein: 22,
    carbs: 60,
    fat: 20,
    imageUrl: 'https://picsum.photos/seed/109/600/400',
    imageHint: 'dal makhani',
    ingredients: ['Black lentils', 'Kidney beans', 'Tomato puree', 'Butter', 'Cream', 'Spices'],
  }
];

export const mealLog: MealLogEntry[] = [
    { date: '2024-07-28', recipe: recipes[0] }, // Salmon
    { date: '2024-07-28', recipe: recipes[3] }, // Avocado Toast
    { date: '2024-07-29', recipe: recipes[1] }, // Quinoa Bowl
    { date: '2024-07-29', recipe: recipes[5] }, // Parfait
    { date: '2024-07-30', recipe: recipes[2] }, // Stir-fry
    { date: '2024-07-30', recipe: recipes[4] }, // Lentil Soup
    { date: '2024-07-30', recipe: recipes[3] }, // Avocado Toast
];
