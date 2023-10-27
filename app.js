const searchForm = document.querySelector(".search-form");
const searchBox= document.querySelector(".search-box");
const searchResult = document.querySelector(".search-result");
const showMoreBtn = document.querySelector(".show-more-btn");
const h2 = document.querySelector("h2");

const accessKey = "5EgOIWbB2cXGoUHJ3Nal6aR2uaA8cdCaMcfZLxsAfm4";

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(data.results.length == 0){
        searchResult.innerHTML = "";
        h2.innerText = "Oops! No images found..!";
        showMoreBtn.style.display = "none";
    } else {
        h2.innerText = "";
        if(page === 1) {
            searchResult.innerHTML = "";
        }
    
    
        const results = data.results;
        results.map((results) => {
            const image = document.createElement("img");
            image.src = results.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = results.links.html;
            imageLink.target = "_blank";
    
            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        })
        showMoreBtn.style.display = "block";
    }
}

    

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
})