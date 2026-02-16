const apilink = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fdc9f6183d8834a2369060e88a2755a4&page=1' //where we access the api from
const img_path = 'https://image.tmdb.org/t/p/w1280'
const search_api = 'https://api.themoviedb.org/3/search/movie?&api_key=fdc9f6183d8834a2369060e88a2755a4&query=' //how can we use the api to search

const main = document.getElementById("section1");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnmovies(apilink)
function returnmovies(url){
   return fetch(url).then(res => res.json())
        .then(function(data){
            console.log(data.results)
            data.results.forEach(element =>{
                const div_card = document.createElement('div')
                div_card.setAttribute('class','card')
                const div_row = document.createElement('div')
                div_row.setAttribute('class','row')
                const div_collumn = document.createElement('div')
                div_collumn.setAttribute('class','collumn')
                const image = document.createElement('img')
                image.setAttribute('class','thumbnail')
                image.setAttribute('id','image')
                const title = document.createElement('h3')
                title.setAttribute('id','title')
                const center = document.createElement('center')
                // center.setAttribute('id','center')

                title.innerHTML = `${element.title}<br><a href ="movie.html?id=${element.id}&title=${element.title}">reviews</a> `
                image.src = img_path + element.poster_path
                center.appendChild(image)
                div_card.appendChild(center)
                div_card.appendChild(title)
                div_collumn.appendChild(div_card)
                div_row.appendChild(div_collumn)

                main.appendChild(div_row)

        });

    });
}

form.addEventListener("submit", (e) =>{
    e.preventDefault()
    main.innerHTML = '';

    const searchItem = search.value
    if(searchItem){
        returnmovies(search_api + searchItem);
        search.value = '';
    }
} );