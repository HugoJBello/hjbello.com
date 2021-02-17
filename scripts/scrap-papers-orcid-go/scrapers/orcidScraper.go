package scrapers

import (
	"fmt"
	"github.com/gocolly/colly"
	"log"
	"strings"
)

type CollectedPaper struct {

}


func ScrapOrcid() {

	baseUrl := "https://orcid.org/0000-0002-3687-1938"

	c := colly.NewCollector(
		// Visit only domains: hackerspaces.org, wiki.hackerspaces.org
		//colly.AllowedDomains("https://elpais.com/"),
	)
	c.OnHTML("h3", func(e *colly.HTMLElement) {
		log.Println("aaa  ")

		if e.Attr("id") == "work.title" && strings.Contains(e.Attr("href"), ".html") {
			url := e.Attr("href")
			fmt.Println(url)
		}
	})

	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		if e.Attr("title") == "ir a la página siguiente" {
			//c.Visit(url)
		}
	})

	// Before making a request print "Visiting ..."
	c.OnRequest(func(r *colly.Request) {
		log.Println("Visiting  ", r.URL.String())
	})

	c.OnError(func(_ *colly.Response, err error) {
		log.Println("Something went wrong:", err)
	})

	c.Visit(baseUrl)

	log.Println("Collected pages")

}

