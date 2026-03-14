const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await page.goto('https://pradeepparmar902.github.io/CWC-Election-Card/?v=' + Date.now(), { waitUntil: 'networkidle2' });
  const menuStyles = await page.evaluate(() => {
    const el = document.querySelector('#ultimate-menu-trigger');
    if (!el) return null;
    const comp = window.getComputedStyle(el);
    return { display: comp.display, position: comp.position, top: comp.top };
  });
  console.log('Menu Computed (Cache-Busted):', menuStyles);
  
  await page.screenshot({ path: 'mobile_shot_busted.png', fullPage: true });

  await browser.close();
})();
