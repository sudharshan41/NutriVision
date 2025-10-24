'use server';

/**
 * @fileOverview Personalized meal recommendations flow.
 *
 * This file defines a Genkit flow that provides personalized meal recommendations
 * based on user-specified health conditions, goals, and allergies.
 *
 * @exports personalizedMealRecommendations - The main function to trigger the flow.
 * @exports PersonalizedMealRecommendationsInput - The input type for the flow.
 * @exports PersonalizedMealRecommendationsOutput - The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedMealRecommendationsInputSchema = z.object({
  healthConditions: z
    .string()
    .describe('The user health conditions (e.g., diabetes, high blood pressure).'),
  goals: z.string().describe('The user dietary goals (e.g., weight loss, muscle gain).'),
  allergies: z.string().describe('The user food allergies (e.g., peanuts, gluten).'),
});

export type PersonalizedMealRecommendationsInput = z.infer<
  typeof PersonalizedMealRecommendationsInputSchema
>;

const PersonalizedMealRecommendationsOutputSchema = z.object({
  mealRecommendations: z
    .string()
    .describe('A list of personalized meal recommendations based on the user input.'),
});

export type PersonalizedMealRecommendationsOutput = z.infer<
  typeof PersonalizedMealRecommendationsOutputSchema
>;

export async function personalizedMealRecommendations(
  input: PersonalizedMealRecommendationsInput
): Promise<PersonalizedMealRecommendationsOutput> {
  return personalizedMealRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedMealRecommendationsPrompt',
  input: {
    schema: PersonalizedMealRecommendationsInputSchema,
  },
  output: {
    schema: PersonalizedMealRecommendationsOutputSchema,
  },
  prompt: `You are a nutrition expert. Provide personalized meal recommendations based on the following information:

Health Conditions: {{{healthConditions}}}
Goals: {{{goals}}}
Allergies: {{{allergies}}}

Consider the user's health conditions, goals, and allergies to provide safe and effective meal options.  Explain why each meal is appropriate given the users input.  Consider any potential food interactions.

Meal Recommendations:`, // No need to fetch the date, it is not always required, and it is not something the LLM decides to retrieve.
});

const personalizedMealRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedMealRecommendationsFlow',
    inputSchema: PersonalizedMealRecommendationsInputSchema,
    outputSchema: PersonalizedMealRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
