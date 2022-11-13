const BASE_URL = "https://striveschool-api.herokuapp.com/api/movies/"
const headers = new Headers({
    "Content-Type": "application/json",
    Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjQyMmQ0YmUzZDAwMTU4NDVmZWYiLCJpYXQiOjE2NjgxMDk5OTcsImV4cCI6MTY2OTMxOTU5N30.vdaqA6iDLq3NY1CpqygeUpueFbYiffQOo2ZFwNKiWAc" ,
    })

const getCategories = (callback) => {
    fetch (BASE_URL, {headers})
    .then ((res) => res.json())
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null))
}

window.onload = function () {
    getCategories((error, data) => {
        if(error){
            console.log({error})
        }
        else{
            data.forEach((category) => {
                const main = document.getElementById("main")
                const container = document.createElement("div")
                main.appendChild(container)

                container.innerHTML += `<h5 class="text-light mt-2 mb-2">${category}</h5>
                <div id="trending-now" class="carousel slide" data-bs-ride="carousel" wrap="false">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="movie-row">
                                <div id="${category}" class="row count">
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#trending-now" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#trending-now" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>`
            })

            data.forEach((category) => {
                fetch (BASE_URL + category, {headers})
                .then((response) => {
                    return response.json()
                })
                .then((movies) => {
                    let row = document.getElementById(`${category}`)
                    movies.forEach((movie) => {
                        let cards = document.createElement("div")
                        cards.className = "col-md-2"
                        cards.innerHTML =  `
                        <a id="edit" href="details.html?id=${movie._id}"><img class="movie-cover" src="${movie.imageUrl}"></a>`
                        row.appendChild(cards)
                    })
                    
                })
            })
        }
        
    }) 
}


// const rowLength = row.length 