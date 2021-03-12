import {ExtractedPaper} from "./orcidScraper";

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
import puppeteer from 'puppeteer-extra'

puppeteer.use(AdblockerPlugin({blockTrackers: true}))
puppeteer.use(StealthPlugin())


export class ArxivScraper {
    public url = "https://arxiv.org/search/?searchtype=author&query=Bello%2C+H+J&order=-announced_date_first&size=50&abstracts=show"

    public scrap = async (): Promise<ExtractedPaper[]> => {

        const papers = [] as ExtractedPaper[]

        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto(this.url, {
            waitUntil: 'networkidle2',
        });

        const div = await page.$(".content")
        const papersCont = await div.$$(".arxiv-result")



        for (const paperCont of papersCont) {
            try {
                const title = await this.extractTitle(paperCont,page)
                const urls = await this.extractUrls(paperCont,page)
                const date = await this.extractDate(paperCont,page)
                console.log("\n")

                const paper: ExtractedPaper = {title, preprintDate:date, pdfPreprint:urls.pdf, url:urls.url}
                console.log(paper)
                papers.push(paper)
            } catch (e) {

            }
        }


        await browser.close();

        return papers

    }


    public extractUrls = async (paperCont: any, page:any) => {
        try {
            const links = await paperCont.$$("a")
            const urls:any = {pdf:undefined, arxiv:undefined}
            for (const link of links) {
                const url:string = await page.evaluate((a:any) => a.href, link);
                if (url.includes("pdf")) urls.pdf = url
                if (url.includes("abs")) urls.arxiv = url
            }
            return urls
        } catch (e) {
            console.log("urls")
        }

    }

    public extractTitle = async (paperCont: any, page:any) => {
        try {
            const spans = await paperCont.$$("title")
            const titleSpan = spans[0]
            const title = await page.evaluate((element:any) => element.textContent, titleSpan);
            return title
        } catch (e) {

        }

    }

    public extractDate = async (paperCont: any,page:any) => {
        try {
            const infoDetail = await paperCont.$(".is-size-7")
            const infoDetailStr = await page.evaluate((element:any) => element.textContent, infoDetail);
            return infoDetailStr
        } catch (e) {
            //console.log(e)
        }

    }

    //_ngcontent-xsk-c0
    public extractAuthors = async (paperCont: any,page:any) => {
        try {
            const infoDetail = await paperCont.$(".authors")
            const infoDetailStr = await page.evaluate((element:any) => element.textContent, infoDetail);
            console.log(infoDetailStr)
            return infoDetailStr
        } catch (e) {
            //console.log(e)
        }

    }


    //_ngcontent-xsk-c0
}
