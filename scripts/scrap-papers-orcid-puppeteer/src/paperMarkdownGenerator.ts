import {ExtractedPaper} from "./orcidScraper";

export class PaperMarkdownGenerator {
    public titleEs = "Artículos"
    public titleEn = "Research Papers"

    public date = (new Date()).toISOString()

    public headMarkDownEs = `
---
title: "${this.titleEs}"
date: ${this.date}
translationKey: Research Papers
tags: ["Research", "Papers"]
toc: true
menu:
    main: {}
---


    `

    public headMarkDownEn = `
---
title: "${this.titleEn}"
date: ${this.date}
translationKey: Research Papers
tags: ["Research", "Papers"]
toc: true
menu:
    main: {}
---


    `
    public generateMarkdown = (papers: ExtractedPaper[]) => {

        const papersInSpanish = this.generateMarkdownLang(papers, "es")
        const papersInEnglish = this.generateMarkdownLang(papers, "en")
        return {spanishVersion: papersInSpanish, englishVersion:papersInEnglish}

    }

    private generateMarkdownLang = (publishedPapers: ExtractedPaper[], language:string) => {

        let papersList: string

        if (language === "es") {
            const publishedPapersSectionHeadEs = "## Artículos publicados"
            papersList = this.headMarkDownEs + "\n" + publishedPapersSectionHeadEs
        } else {
            const publishedPapersSectionHeadEn = "## Published papers"
            papersList = this.headMarkDownEn + "\n" + publishedPapersSectionHeadEn
        }


        for (const paper of publishedPapers) {
            const mdPaper = this.generatePaperEntry(paper,language)
            papersList = papersList + "\n\n" + mdPaper
        }

        return papersList
    }

    private generatePaperEntry = (paper: ExtractedPaper, language:string) => {
        let mdPaper = "1. " + `**${paper.title}**`

        if (paper.journalType) {
            mdPaper = mdPaper + `\n ${paper.date} - *${paper.journal}*  (${paper.journalType})`
        } else {
            mdPaper = mdPaper + `\n ${paper.date} - *${paper.journal}*`
        }

        if (paper.doi) {
            mdPaper = mdPaper + `\n *[${paper.doi}](${paper.doi})*`
        }

        return mdPaper

    }

}
