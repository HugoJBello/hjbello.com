import {OrcidScraper} from "./orcidScraper";
import fs  from 'fs'

(async () => {

    const orcidScraper = new OrcidScraper()
    const papers = await orcidScraper.scrap()

    fs.writeFileSync("data/papers_orcid.json", JSON.stringify(papers))

})();
