import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
const fs = require('fs')
let epoch = Date.now()
let lastRunString = fs.readFileSync('lastrun.txt', 'utf-8')
let lastRunNumber = parseInt(lastRunString)
let elapsed = epoch - lastRunNumber
let month = 2.628e9

let firstName = 'Aidan'
let lastName = 'Gibson'
let DOBYear = '1998'
let DOBMonth = 6
let DOBDay = 8
let emailAddr = 'tronicdude@gmail.com'
let cellPhone = '8188523750'
let streetAddress = '5955 SE Milwaukie Ave Apt 112'

if (elapsed > month) {
  puppeteer
    .use(StealthPlugin())
    .launch({
      headless: false,
      // slowMo: 250,
      slowMo: 100,
      defaultViewport: null,
      args: ['--remote-debugging-port=9222', '--remote-debugging-address=0.0.0.0'],
    }) //chrome://inspect
    .then(async (browser) => {
      const page = await browser.newPage()
      await page.setDefaultNavigationTimeout(60000)
      await page.goto('https://dexcom.custhelp.com/')
      {
        //click date text box to make calendar visible
        const element = await page.waitForSelector(`input[name="Incident.CustomFields.CO.EventDate"]`)
        await element?.click()
        // await element?.evaluate((b) => b.click())
      }
      {
        //always pick current date (highlighted)
        const element = await page.waitForSelector(`a.ui-state-highlight`)
        await element?.click()
        // await element?.evaluate((b) => b.click())
      }
      {
        await page.waitForSelector(`select[name="OPA.Complaints.ComplaintCode"]`)
        await page.select(`select[name="OPA.Complaints.ComplaintCode"]`, '33')
      }
      {
        const element = await page.waitForSelector(`input[name='chkLotNumber']`)
        await element?.click()
        // await element?.evaluate((b) => b.click())
      }
      {
        const element = await page.waitForSelector(`input[name="OPA.Complaint.InsertionDate"]`)
        await element?.click()
        // await element?.evaluate((b) => b.click())
      }
      {
        const element = await page.waitForSelector(`a.ui-state-highlight`)
        const day = await page.evaluate((el) => el.innerText, element)
        let failDay = day - 1
        if (failDay <= 0) {
          failDay = 28
          //click calendar back a month
          const elem = await page.waitForSelector(`.ui-icon-circle-triangle-w`)
          await elem?.click()
          // await elem?.evaluate((b) => b.click())
        }
        const linkHandlers = await page.$x(`//a[contains(text(), ${failDay})]`)
        if (linkHandlers.length > 0) {
          await linkHandlers[0].click()
        } else {
          throw new Error('Link not found')
        }
      }
      {
        await page.waitForSelector(`select[name='Interviews.InsertionSites']`)
        await page.select(`select[name='Interviews.InsertionSites']`, '1')
      }
      {
        const element = await page.waitForSelector(`input[name='chkTransmitterID']`)
        await element?.click()
        // await element?.evaluate((b) => b.click())
      }
      {
        await page.waitForSelector(`select[name='OPA.Complaint.SystemGenerationList']`)
        await page.select(`select[name='OPA.Complaint.SystemGenerationList']`, 'G6')
      }
      {
        await page.waitForSelector(`select[name^='Interviews.Sensor.M_PatientTookAcetaminophen']`)
        await page.select(`select[name^='Interviews.Sensor.M_PatientTookAcetaminophen']`, '2')
      }
      {
        await page.waitForSelector('select#reporter_type')
        await page.select('select#reporter_type', '1')
      }
      {
        const element = await page.waitForSelector(`input[name='Contact.Name.First']`)
        await element?.type(firstName)
      }
      {
        const element = await page.waitForSelector(`input[name='Contact.Name.Last']`)
        await element?.type(lastName)
      }
      {
        const element = await page.waitForSelector(`input[name="date_of_birth"]`)
        await element?.click()
        // await element?.evaluate((b) => b.click())
        await page.select('select.ui-datepicker-year', DOBYear)
        await page.select('select.ui-datepicker-month', String(DOBMonth - 1))
        // month starts at 0, ie January is 0

        // const linkHandlers = await page.$x(`//a[contains(text(), "8")]`)
        const linkHandlers = await page.$x(`//a[contains(text(), "${DOBDay}")]`)
        if (linkHandlers.length > 0) {
          await linkHandlers[0].click()
        } else {
          throw new Error('Link not found')
        }
      }
      {
        await page.waitForSelector('select[name="Contact.CustomFields.c.gender"]')
        await page.select('select[name="Contact.CustomFields.c.gender"]', '1')
      }
      {
        const element = await page.waitForSelector(`input[name='Contact.Emails.PRIMARY.Address']`)
        await element?.type(emailAddr)
      }
      {
        await page.waitForSelector('select[name="phone_type"]')
        await page.select('select[name="phone_type"]', 'Mobile Phone')
      }
      {
        const element = await page.waitForSelector(`input[name='Contact.Phones.MOBILE.Number']`)
        await element?.type(cellPhone)
      }
      {
        await page.waitForSelector('select[name="method_of_contact"]')
        await page.select('select[name="method_of_contact"]', 'Email')
      }
      {
        const element = await page.waitForSelector(`input[name='CO.MultiAddress.Street']`)
        await element?.type(streetAddress)
      }
      {
        // TODO this'll b diff for soph
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
      }
      // TODO unnecessary for me, autofilled by hitting "Enter" on correct addr
      // {
      //   const element = await page.waitForSelector(`input[name='CO.MultiAddress.City']`)
      //   await element?.type('Portland')
      // }
      // {
      //   const element = await page.waitForSelector(`input[name='CO.MultiAddress.Zip']`)
      //   await element?.type('97202')
      // }
      // {
      //   await page.waitForSelector('select[name="Contact.Address.StateOrProvince"]')
      //   await page.select('select[name="Contact.Address.StateOrProvince"]', '42')
      // }
      // {
      //   await page.waitForSelector('select[name="Contact_CustomFields_CO_Country"]')
      //   await page.select('select[name="Contact_CustomFields_CO_Country"]', '1')
      // }
      {
        const element = await page.waitForSelector(`input[name='Incident.CustomFields.CO.AcceptTerms']`)
        await element?.click()
        // await element?.evaluate((b) => b.click())
      }
      {
        //accept cookies
        const element = await page.waitForSelector(`a[class="close"]`)
        await element?.click()
      }
      {
        const element = await page.waitForSelector(`button[id="submit_btn"]`)
        await element?.click()
      }
      await Promise.all([page.waitForNavigation()])
      if (page.url().includes('dexcom.custhelp.com/app/callback_confirm/refno/')) {
        await browser.close()

        let d = new Date()
        let dateString = d.toString() + '\n'
        fs.writeFile('lastrun.txt', Date.now().toString(), (err: any) => {
          if (err) throw err
        })
        fs.appendFile('history.txt', dateString, (err: any) => {
          if (err) throw err
        })
      }
    })
} else {
  console.log('Too soon')
}
