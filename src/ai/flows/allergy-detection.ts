'use server';

/**
 * @fileOverview This file defines a Genkit flow for detecting potential allergens in a meal plan or recipe.
 *
 * It includes:
 * - `allergyDetection`:  A function to detect allergens in a given meal plan or recipe.
 * - `AllergyDetectionInput`: The input type for the `allergyDetection` function, including the meal plan/recipe text and a list of allergens.
 * - `AllergyDetectionOutput`: The output type for the `allergyDetection` function, indicating whether allergens were detected and, if so, which ones.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AllergyDetectionInputSchema = z.object({
  mealPlan: z.string().describe('The meal plan or recipe text to analyze.'),
  allergens: z.array(z.string()).describe('A list of allergens to check for.'),
});
export type AllergyDetectionInput = z.infer<typeof AllergyDetectionInputSchema>;

const AllergyDetectionOutputSchema = z.object({
  containsAllergens: z
    .boolean()
    .describe('Whether the meal plan or recipe contains any of the specified allergens.'),
  detectedAllergens: z
    .array(z.string())
    .describe('A list of allergens detected in the meal plan or recipe.'),
});
export type AllergyDetectionOutput = z.infer<typeof AllergyDetectionOutputSchema>;

export async function allergyDetection(input: AllergyDetectionInput): Promise<AllergyDetectionOutput> {
  return allergyDetectionFlow(input);
}

const allergyDetectionPrompt = ai.definePrompt({
  name: 'allergyDetectionPrompt',
  input: {schema: AllergyDetectionInputSchema},
  output: {schema: AllergyDetectionOutputSchema},
  prompt: `You are an AI assistant designed to detect potential allergens in a given meal plan or recipe.

  Analyze the following meal plan or recipe:
  {{mealPlan}}

  Check for the presence of the following allergens:
  {{#each allergens}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Determine whether the meal plan or recipe contains any of the specified allergens. If allergens are found, list which ones were detected.

  Output in JSON format:
  {
    "containsAllergens": true/false, // whether allergens are present
    "detectedAllergens": ["allergen1", "allergen2", ...] // list of allergens detected, empty if none
  }`,
});

const allergyDetectionFlow = ai.defineFlow(
  {
    name: 'allergyDetectionFlow',
    inputSchema: AllergyDetectionInputSchema,
    outputSchema: AllergyDetectionOutputSchema,
  },
  async input => {
    const {output} = await allergyDetectionPrompt(input);
    return output!;
  }
);
