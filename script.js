
var request = new XMLHttpRequest()
var request2 = new XMLHttpRequest()
let input = document.querySelector("input")
let url = `https://api.tvmaze.com/shows`
let url2= `https://api.tvmaze.com/shows?q=${input.value}`
let data;
let data2;
const listDiv = document.querySelector(".autocom-box")
const main = document.querySelector("main")
const listItem = document.querySelector("li")
const body = document.querySelector("body")
function fetchData(){

    request.open("GET", url+input.value)

    request.send()

    request.onload = function(){

        data = JSON.parse(request.responseText)
        console.log(data)
        createCards(data)
    }
}


function createCards(data){

    data.forEach((e,i,arr)=>{
        if(i<51){
        let card = document.createElement("div")
        let img = document.createElement("img")
        let name = document.createElement("p")

        img.setAttribute("src",e.image.medium)                // img.src = e.url
        name.innerHTML = e.name
        card.addEventListener("click", function() {
            window.location.href = "./index2.html"
            localStorage.setItem("show", e.id)
        })

        

       

        card.append(img, name)
        main.append(card)




        }
    })
}

console.log(input.value)



function fetchSearchData(){ 

    console.log(url2)
    request2.open("GET", url2)

    request2.send()

    request2.onload = function (){

        data2 = JSON.parse(request2.responseText)
        console.log(data2)
        
        createList(data2)

    }

}



input.onkeyup = function(){
    console.log(url2)
    console.log(input.value)
    url2= `https://api.tvmaze.com/search/shows?q=${input.value}`

fetchSearchData()

}


function createList(data2){
    listDiv.classList.remove("onclick")
    listDiv.innerHTML=""
    data2.forEach((e,i,arr)=>{
        if(i<10){
        let listI = document.createElement("li")

        listI.innerHTML = e.show.name
        listI.addEventListener("click",function(){
                window.location.href = "./index2.html"
                localStorage.setItem("show", e.show.id)
            })

        listDiv.appendChild(listI)
        }
    })

}







body.addEventListener("click", function(e){
    e.stopPropagation()

    listDiv.classList.add("onclick")

})







console.log(url)



window.addEventListener("load", fetchData)
