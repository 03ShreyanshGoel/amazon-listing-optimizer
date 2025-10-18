import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

IMPORTANT: Respond ONLY with valid JSON in this exact format:
{
  "optimized_title": "...",
  "optimized_bullets": ["...", "...", "...", "...", "..."],
  "optimized_description": "...",
  "keywords": ["...", "...", "...", "...", "..."]
}

Do not include any markdown formatting, code blocks, or explanatory text. Only return the raw JSON object.`;

  try {
    // Use Gemini Pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    console.log('Sending request to Gemini AI...');
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    console.log('Received response from Gemini AI');
    
    // Clean the response - remove markdown code blocks if present
    let cleanedContent = content.trim();
    
    // Remove ```json and ``` if present
    cleanedContent = cleanedContent.replace(/```json\s*/g, '');
    cleanedContent = cleanedContent.replace(/```\s*/g, '');
    cleanedContent = cleanedContent.trim();
    
    // Try to extract JSON from the response
    const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0]);
      
      // Validate the response has all required fields
      if (!parsedData.optimized_title || 
          !parsedData.optimized_bullets || 
          !parsedData.optimized_description || 
          !parsedData.keywords) {
        throw new Error('Invalid response format - missing required fields');
      }
      
      // Ensure optimized_bullets has exactly 5 items
      if (parsedData.optimized_bullets.length < 5) {
        console.warn('Less than 5 bullets received, padding with original bullets');
        while (parsedData.optimized_bullets.length < 5 && productData.bullets.length > 0) {
          parsedData.optimized_bullets.push(
            productData.bullets[parsedData.optimized_bullets.length] || 'Additional product feature'
          );
        }
      }
      
      // Ensure keywords has exactly 5 items
      if (parsedData.keywords.length < 5) {
        console.warn('Less than 5 keywords received, adding generic keywords');
        const genericKeywords = ['quality', 'durable', 'reliable', 'premium', 'best'];
        while (parsedData.keywords.length < 5) {
          parsedData.keywords.push(genericKeywords[parsedData.keywords.length] || 'product');
        }
      }
      
      // Truncate title if too long
      if (parsedData.optimized_title.length > 200) {
        parsedData.optimized_title = parsedData.optimized_title.substring(0, 197) + '...';
      }
      
      console.log('✅ Successfully parsed and validated Gemini response');
      return parsedData;
    }
    
    throw new Error('Could not extract valid JSON from Gemini response');

  } catch (error) {
    console.error('❌ Gemini AI optimization error:', error);
    
    // Provide more helpful error messages
    if (error.message.includes('API key')) {
      throw new Error('Invalid Gemini API key. Please check your GEMINI_API_KEY in .env file');
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      throw new Error('Gemini API quota exceeded. Please try again later or check your API limits');
    } else if (error.message.includes('JSON')) {
      throw new Error('Failed to parse Gemini response. The AI returned invalid format');
    } else {
      throw new Error(`Gemini AI error: ${error.message}`);
    }
  }
}