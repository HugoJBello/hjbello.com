"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperMarkdownGenerator = void 0;
class PaperMarkdownGenerator {
    constructor() {
        this.titleEs = "Artículos";
        this.titleEn = "Research Papers";
        this.date = (new Date()).toISOString();
        this.headMarkDownEs = `
---
title: "${this.titleEs}"
date: ${this.date}
translationKey: Research Papers
tags: ["Research", "Papers"]
toc: true
menu:
    main: {}
---


    `;
        this.headMarkDownEn = `
---
title: "${this.titleEn}"
date: ${this.date}
translationKey: Research Papers
tags: ["Research", "Papers"]
toc: true
menu:
main: {}
---


    `;
        this.generateMarkdown = (papers) => {
            const papersInSpanish = this.generateMarkdownLang(papers, "es");
            const papersInEnglish = this.generateMarkdownLang(papers, "en");
            return { spanishVersion: papersInSpanish, englishVersion: papersInEnglish };
        };
        this.generateMarkdownLang = (publishedPapers, language) => {
            let papersList;
            if (language === "es") {
                const publishedPapersSectionHeadEs = "## Artículos publicados";
                papersList = this.headMarkDownEs + "\n" + publishedPapersSectionHeadEs;
            }
            else {
                const publishedPapersSectionHeadEn = "## Published papers";
                papersList = this.headMarkDownEn + "\n" + publishedPapersSectionHeadEn;
            }
            for (const paper of publishedPapers) {
                const mdPaper = this.generatePaperEntry(paper, language);
                papersList = papersList + "\n\n" + mdPaper;
            }
            return papersList;
        };
        this.generatePaperEntry = (paper, language) => {
            let mdPaper = "1. " + `**${paper.title}**`;
            if (paper.journalType) {
                mdPaper = mdPaper + `\n ${paper.date} - *${paper.journal}*  (${paper.journalType})`;
            }
            else {
                mdPaper = mdPaper + `\n ${paper.date} - *${paper.journal}*`;
            }
            if (paper.doi) {
                mdPaper = mdPaper + `\n *[${paper.doi}](${paper.doi})*`;
            }
            return mdPaper;
        };
    }
}
exports.PaperMarkdownGenerator = PaperMarkdownGenerator;
//# sourceMappingURL=paperMarkdownGenerator.js.map