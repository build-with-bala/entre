'use server';
/**
 * @fileOverview An AI agent that suggests potential resolvers for a query based on its content.
 *
 * - suggestResolvers - A function that suggests resolvers for a query.
 * - SuggestResolversInput - The input type for the suggestResolvers function.
 * - SuggestResolversOutput - The return type for the suggestResolvers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestResolversInputSchema = z.object({
  queryText: z.string().describe('The text content of the query.'),
});
export type SuggestResolversInput = z.infer<typeof SuggestResolversInputSchema>;

const SuggestResolversOutputSchema = z.object({
  suggestedResolvers: z
    .array(z.enum(['CR', 'MediaClub', 'ITClub', 'Admin']))
    .describe("An array of suggested resolvers (CR, MediaClub, ITClub, Admin) for the query."),
});
export type SuggestResolversOutput = z.infer<typeof SuggestResolversOutputSchema>;

export async function suggestResolvers(input: SuggestResolversInput): Promise<SuggestResolversOutput> {
  return suggestResolversFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestResolversPrompt',
  input: {schema: SuggestResolversInputSchema},
  output: {schema: SuggestResolversOutputSchema},
  prompt: `You are an AI assistant designed to suggest the most appropriate resolvers for a given query.

  Based on the query text, determine which roles (CR, MediaClub, ITClub, Admin) are best suited to handle the query.
  Return an array of suggested resolvers.

  Query: {{{queryText}}}
  `,
});

const suggestResolversFlow = ai.defineFlow(
  {
    name: 'suggestResolversFlow',
    inputSchema: SuggestResolversInputSchema,
    outputSchema: SuggestResolversOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
