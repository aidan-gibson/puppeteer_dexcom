"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
puppeteer_extra_1.default
    .use((0, puppeteer_extra_plugin_stealth_1.default)())
    .launch({ headless: false })
    .then(async (browser) => {
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(600000);
    await page.goto('http://dexcom.custhelp.com');
    //await browser.close()
});
