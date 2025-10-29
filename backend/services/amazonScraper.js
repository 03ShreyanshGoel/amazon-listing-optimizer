import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

export async function scrapeAmazonProduct(asin) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      defaultViewport: { width: 1366, height: 768 },
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(180000);
    page.setDefaultTimeout(180000);

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    const url = `https://www.amazon.in/dp/${asin}`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 180000 });
    await page.waitForSelector('#productTitle', { timeout: 60000 });

    const productData = await page.evaluate(() => {
      const data = {
        title: document.querySelector('#productTitle')?.textContent.trim() || '',
        bullets: Array.from(
          document.querySelectorAll('#feature-bullets ul li span.a-list-item')
        )
          .map(el => el.textContent.trim())
          .filter(Boolean),
        description:
          document.querySelector('#productDescription')?.innerText.trim() ||
          document.querySelector('#aplus_feature_div')?.innerText.trim() ||
          '',
      };
      return data;
    });

    return productData;
  } finally {
    if (browser) await browser.close();
  }
}
