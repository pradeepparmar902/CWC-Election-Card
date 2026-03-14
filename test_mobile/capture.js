const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await page.goto('https://pradeepparmar902.github.io/CWC-Election-Card/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'mobile_shot.png', fullPage: true });
  
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto('https://pradeepparmar902.github.io/CWC-Election-Card/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'desktop_shot.png', fullPage: true });
  
  await browser.close();
  console.log('Screenshots captured');
})();
