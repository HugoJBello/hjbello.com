import {OrcidScraper} from "./orcidScraper";
import fs  from 'fs'
import {PaperMarkdownGenerator} from "./paperMarkdownGenerator";
(async () => {

    const orcidScraper = new OrcidScraper()
    const papers = await orcidScraper.scrap()

    fs.writeFileSync("data/papers_orcid.json", JSON.stringify(papers))

    const paperMarkdownGenrator = new PaperMarkdownGenerator()

    const {spanishVersion, englishVersion} =  paperMarkdownGenrator.generateMarkdown(papers)

    fs.writeFileSync("data/papers.es.md", spanishVersion)
    fs.writeFileSync("../../content/posts/papers.es.md", spanishVersion)

    fs.writeFileSync("data/papers.en.md", englishVersion)
    fs.writeFileSync("../../content/posts/papers.en.md", englishVersion)


})();
