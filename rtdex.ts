import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer
  .use(StealthPlugin())
  .launch({ headless: false })
  .then(async (browser) => {
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(600000)
    await page.goto('http://dexcom.custhelp.com')
    //await browser.close()
  })
