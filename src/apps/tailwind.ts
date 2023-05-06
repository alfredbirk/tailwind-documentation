import { AppConfig } from "../models"

const tailwind: AppConfig = {
    displayName: "Tailwind",
    logoPath: "src/logos/tailwind.svg",
    indexName: "tailwindcss",
    algoliaApiUrl: "https://knpxzi5b0m-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.9.2)%3B%20Browser%20(lite)%3B%20docsearch%20(1.0.0-alpha.27)%3B%20docsearch-react%20(1.0.0-alpha.27)%3B%20autocomplete-core%20(1.0.0-alpha.28)&x-algolia-api-key=5fc87cef58bb80203d2207578309fab6&x-algolia-application-id=KNPXZI5B0M",
    extraBodyParams: {
        "facetFilters":"version:v3",
    }
}

export default tailwind