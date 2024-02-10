const { JSDOM } = require('jsdom')


async function crawlPage(baseURL, currentURL, pages) {
    try {
        if (!isSameDomain(baseURL, currentURL)) {
            return pages
        }
        const normURL = normalizeURL(currentURL)
        if (normURL in pages) {
            pages[normURL]++
            return pages
        }
        pages[normURL] = 1
        console.log(`Crawling url:  ${currentURL}`)
        const response = await fetch(currentURL)
        const contentType = response.headers.get('content-type')
        const isClientError = response.status >= 400
        const isTextHTML = contentType.includes('text/html') 
        if (isClientError || !isTextHTML) {
            console.log("Error getting HTML")
            return pages
        }
        const urls = getURLsFromHTML(await response.text(), baseURL)
        const crawlPromises = urls.map(url => crawlPage(baseURL, url, pages))
        await Promise.all(crawlPromises)
    } catch (error) {
        console.log(error.message)
    }
    return pages
}


function isSameDomain(url1, url2) {
    const dom1 = new URL(url1).hostname
    const dom2 = new URL(url2).hostname
    return dom1 === dom2
}

function normalizeURL(urlString) {
    try {
        const urlObj  = new URL(urlString)
        const normalized = urlObj.hostname + urlObj.pathname 
        return normalized
    } catch (error) {
        console.log('Invalid URL')
        return null
    }
}

function getURLsFromHTML(htmlString, baseURL) {
    const dom = new JSDOM(htmlString, {url: baseURL})
    const a_tags = dom.window.document.getElementsByTagName('a')
    let urls = []
    for (let tag of a_tags) {
        const url = tag.href
        urls.push(url)
    }
    return urls
}



module.exports ={
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}