// const puppeteer = require('puppeteer-extra')
// const StealthPlugin = require('puppeteer-extra-plugin-stealth')
// // StealthPlugin.enabledEvasions.delete(`chrome.runtime`)
// // StealthPlugin.enabledEvasions.delete(`iframe.contentWindow`)
// puppeteer.use(StealthPlugin())
// ;(async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//   })
//   const [page] = await browser.pages()
//   await page.goto('https://dexcom.custhelp.com/')
//   //await page.goto('https://google.com')
//   //await browser.close()
// })()
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer
  .use(StealthPlugin())
  .launch({ headless: false })
  .then(async (browser) => {
    const page = await browser.newPage()
    await page.goto('https://bot.sannysoft.com')
    //await page.waitForTimeout(5000)
    //await page.screenshot({ path: 'stealth.png', fullPage: true })
    //await browser.close()
  })
