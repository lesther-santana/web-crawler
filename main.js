const { argv, exit } = require('node:process')
const { crawlPage, normalizeURL } = require("./crawl")
const { printReport } = require('./report')

async function main () {
    if (argv.length < 3 || argv > 3 ) {
        console.log("Error... Invalid argument.... Bye!")
        exit(1)
    }
    console.time('Execution time')
    const baseURL = new URL(argv[2])
    console.log(`Base URL = ${baseURL}`)
    console.log("Crawler ready to roll! .......")
    const pages = await crawlPage(baseURL.origin, baseURL.origin, {})
    printReport(pages)
    console.timeEnd('Execution time')
}

main()