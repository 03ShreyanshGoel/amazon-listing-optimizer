// import puppeteer from 'puppeteer-extra';
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// puppeteer.use(StealthPlugin());

// export async function scrapeAmazonProduct(asin) {
//   let browser;
  
//   try {
//     browser = await puppeteer.launch({
//       headless: 'new',
//       args: ['--no-sandbox', '--disable-setuid-sandbox']
//     });

//     const page = await browser.newPage();
//     console.log("page: ", page);
    
//     // Set user agent to avoid detection
//     await page.setUserAgent(
//       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
//     );

//     const url = `https://www.amazon.in/dp/${asin}`
//     // const url = "https://www.amazon.in/dp/B0DZDDQ429"
//     await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

//     // Extract product data
//     const productData = await page.evaluate(() => {
//       const data = {
//         title: '',
//         bullets: [],
//         description: ''
//       };

//       // Extract title
//       const titleElement = document.querySelector('#productTitle');
//       if (titleElement) {
//         data.title = titleElement.textContent.trim();
//         console.log("found title: ",data.title);
//       }

//       // Extract bullet points
//       const bulletElements = document.querySelectorAll('#feature-bullets ul li span.a-list-item');
//       data.bullets = Array.from(bulletElements)
//         .map(bullet => bullet.textContent.trim())
//         .filter(text => text.length > 0);

//       // Extract description
//       // const descElement = document.querySelector('#productDescription p');
//       // if (descElement) {
//       //   data.description = descElement.textContent.trim();
//       // } else {
//       //   // Try alternative selector
//       //   const altDesc = document.querySelector('#aplus');
//       //   if (altDesc) {
//       //     data.description = altDesc.textContent.trim().substring(0, 500);
//       //   }
//       // }
//       let description = document.querySelector('#productDescription')?.innerText.trim() || '';
//       if (!description) {
//         // Fallback: Check expanded content or other sections
//         const expandedDesc = document.querySelector('#productDescription_feature_div .a-expander-content')?.innerText.trim() || '';
//         description = expandedDesc;
//       }
//       console.log("scraped data: ", data);
//       return data;
//     });

//     return productData;

//   } catch (error) {
//     console.error('Scraping error:', error);
//     throw new Error(`Failed to scrape Amazon product: ${error.message}`);
//   } finally {
//     if (browser) {
//       await browser.close();
//     }
//   }
// }

import puppeteer from 'puppeteer';

export async function scrapeAmazonProduct(asin) {
  let browser;
  try {
    const execPath = puppeteer.executablePath(); // Puppeteer bundled Chromium
    browser = await puppeteer.launch({
      executablePath: execPath,
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ],
      defaultViewport: { width: 1366, height: 768 }
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    const url = `https://www.amazon.in/dp/${asin}`;
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Extract product data using updated selectors
    const productData = await page.evaluate(() => {
      const data = {
        title: '',
        bullets: [],
        description: ''
      };

      // Title
      const titleElement = document.querySelector('#productTitle');
      if (titleElement) {
        data.title = titleElement.textContent.trim();
      }

      // Bullet points
      const bulletElements = document.querySelectorAll('#feature-bullets ul li span.a-list-item');
      data.bullets = Array.from(bulletElements)
        .map(bullet => bullet.textContent.trim())
        .filter(text => text.length > 0);

      // Description
      let description = document.querySelector('#productDescription')?.innerText.trim() || '';
      if (!description) {
        const expandedDesc = document.querySelector('#productDescription_feature_div .a-expander-content')?.innerText.trim() || '';
        description = expandedDesc;
      }
      if (!description) {
        const aplusDesc = document.querySelector('#aplus_feature_div')?.innerText.trim() || '';
        description = aplusDesc;
      }
      data.description = description;

      return data;
    });

    return productData;
  } finally {
    if (browser) await browser.close();
  }
}
