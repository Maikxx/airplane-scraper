# Airplane scraper

A scraper for getting structured data from the wikipedia pages of a lot of commercial airplanes.

**Warning**
Due to the large amount of requests, it is smart not to run `yarn start-server` on cellular.

## Installation

* Clone the repository: `git clone git@github.com:Maikxx/airplane-scraper.git`
* Navigate into the directory: `cd airplane-scraper`
* Install dependencies: `yarn` or `npm install`
* Run: `cp .env.example .env` and then fill out the required variables
* Make sure to run the [storeToMongo](./api/db/storeToMongo.ts) function before starting the api
* Start the development server: `yarn start-api`

## License

This repository is licensed as [MIT](LICENSE) by [Maikel van Veen](https://github.com/maikxx).