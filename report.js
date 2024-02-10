function printReport(pages){
    console.log(`------------------------- Cooking Report! -------------------------`)
    const arr = Object.entries(pages)
    arr.sort((a, b) => b[1] - a[1])
    for(i in arr) {
        const word = arr[i][1] > 1 ? 'links': 'link'
        console.log(`Found ${arr[i][1]} internal ${word} to ${arr[i][0]}`)
    }
    console.log(`------------------------- Cooking Done! -------------------------`)
    
}

module.exports = {
    printReport
}