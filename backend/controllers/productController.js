import { scrapeAmazonProduct } from '../services/amazonScraper.js';
import { optimizeProductListing } from '../services/aiOptimizer.js';
import { Product } from '../models/Product.js';

export const optimizeProduct = async (req, res, next) => {
  try {
    const { asin } = req.body;

    if (!asin || !/^[A-Z0-9]{10}$/.test(asin)) {
      return res.status(400).json({ 
        error: 'Invalid ASIN format. ASIN should be 10 alphanumeric characters.' 
      });
    }

    // Step 1: Scrape Amazon product
    console.log(`Scraping product: ${asin}`);
    const scrapedData = await scrapeAmazonProduct(asin);

    if (!scrapedData.title) {
      return res.status(404).json({ 
        error: 'Product not found or unable to extract data' 
      });
    }

    // Step 2: Optimize with AI
    console.log('Optimizing with AI...');
    const optimizedData = await optimizeProductListing(scrapedData);

    // Step 3: Save to database
    const productData = {
      asin,
      original_title: scrapedData.title,
      original_bullets: scrapedData.bullets,
      original_description: scrapedData.description,
      optimized_title: optimizedData.optimized_title,
      optimized_bullets: optimizedData.optimized_bullets,
      optimized_description: optimizedData.optimized_description,
      keywords: optimizedData.keywords
    };

    await Product.create(productData);

    // Step 4: Return response
    res.json({
      success: true,
      data: {
        asin,
        original: {
          title: scrapedData.title,
          bullets: scrapedData.bullets,
          description: scrapedData.description
        },
        optimized: {
          title: optimizedData.optimized_title,
          bullets: optimizedData.optimized_bullets,
          description: optimizedData.optimized_description,
          keywords: optimizedData.keywords
        }
      }
    });

  } catch (error) {
    next(error);
  }
};

export const getProductHistory = async (req, res, next) => {
  try {
    const { asin } = req.params;

    const history = await Product.findByAsin(asin);

    res.json({
      success: true,
      data: history
    });

  } catch (error) {
    next(error);
  }
};

export const getAllHistory = async (req, res, next) => {
  try {
    const history = await Product.findAll();

    res.json({
      success: true,
      data: history
    });

  } catch (error) {
    next(error);
  }
};