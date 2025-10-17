import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function optimizeProductListing(productData) {
  const prompt = `You are an Amazon SEO and copywriting expert. Optimize the following product listing:

ORIGINAL TITLE: ${productData.title}

ORIGINAL BULLET POINTS:
${productData.bullets.map((b, i) => `${i + 1}. ${b}`).join('\n')}

ORIGINAL DESCRIPTION: ${productData.description}

Please provide:
1. An improved title (max 200 characters, keyword-rich, readable, compelling)
2. 5 rewritten bullet points (clear, concise, benefit-focused, SEO-optimized)
3. An enhanced description (persuasive, compliant with Amazon guidelines, 150-250 words)
4. 5 relevant keyword suggestions for Amazon SEO

Format your response as JSON:
{
  "optimized_title": "...",
  "optimized_bullets": ["...", "...", "...", "...", "..."],
  "optimized_description": "...",
  "keywords": ["...", "...", "...", "...", "..."]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert Amazon listing optimizer. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = response.choices[0].message.content;
    
    // Parse JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Invalid AI response format');

  } catch (error) {
    console.error('AI optimization error:', error);
    throw new Error(`Failed to optimize listing: ${error.message}`);
  }
}