let showID = localStorage.getItem("show")
let url = `https://api.tvmaze.com/shows/${showID}`
let season = `https://api.tvmaze.com/shows/${showID}/seasons`
let cast = `https://api.tvmaze.com/shows/${showID}/cast`
let data;
let data2;
let data3;
const request = new XMLHttpRequest()
const request2 = new XMLHttpRequest()
const request3 = new XMLHttpRequest()
console.log(showID)
console.log(season)

let divSlika = document.querySelector("div.slika")
const ime = document.querySelector("h1")
const sumary = document.querySelector("p")
const divSezone = document.querySelector("div.seasons")
const h2Sezone = document.querySelector("div.seasons h2")
const ulSezone = document.querySelector("div.seasons ul")
const ulCast = document.querySelector("div.cast ul")


function fetchData() {

    request.open("GET", url);
    request.send()
    request.onload = function() {
        data = JSON.parse(request.responseText)
        console.log(data)
        createCard(data)
        fetchData2()
    }


}

function fetchData2() {

    request2.open("GET", season)

    request2.send()

    request2.onload = function() {

        data2 = JSON.parse(request2.responseText)
            //createSeasons(data2)
        console.log(data2)
        createSeason(data2)
        fetchData3()
    }

}

function fetchData3() {

    request3.open("GET", cast)

    request3.send()

    request3.onload = function() {

        data3 = JSON.parse(request3.responseText)
        createCast(data3)
        console.log(data3)
    }
}





function createCard(show) {

    let image = document.createElement("img")

    ime.innerHTML = show.name
    image.setAttribute("src", show.image.original)
    divSlika.append(image);
    sumary.innerHTML = show.summary
        //image.setAttribute("src",e.image.medium)
        //

}

function createSeason(data2) {
    console.log(data2)

    data2.forEach((e, i, arr) => {

        let listItem = document.createElement("li")

        h2Sezone.innerHTML = "Seasons:" + data2.length
        listItem.innerHTML = e.premiereDate + " - " + e.endDate

        ulSezone.append(listItem)

    })
}

function createCast(data3) {



    data3.forEach((e, i, arr) => {
        if (i < 10) {

            let listItem2 = document.createElement("li")

            listItem2.innerHTML = e.person.name

            ulCast.append(listItem2)
        }
    })

}






window.addEventListener("load", fetchData)
