let theme_btn = document.querySelector(".theme-btn");
let input = document.querySelector("#searchInput");
const accessKey = "gaLD7V81pu80N_afKJMIY_QpKPCkqe1hjWQw7wdPTRw";
const form = document.querySelector("form");
const searchResults = document.querySelector(".result-container");
const showMoreDiv = document.querySelector(".show-more-div")
const showMoreBtn = document.querySelector(".show-more-div button")

let inputData = "";
let page = 1;

        theme_btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme")
        let theme_icon = document.querySelector("#theme-icon");

        if (document.body.classList.contains("dark-theme")) {
            theme_icon.classList.remove("fa-moon");
            theme_icon.classList.add("fa-sun");
            theme_btn.textContent = "Light";
        } else {
            theme_icon.classList.remove("fa-sun");
            theme_icon.classList.add("fa-moon");
            theme_btn.textContent = "Dark";
        }

        theme_btn.prepend(theme_icon);
    })


    document.querySelectorAll('.suggestion-texts span').forEach(span => {
        span.addEventListener('click', function() {
            document.getElementById('searchInput').value = this.textContent;
            searchImages();
        });
    });


    async function searchImages(){
        inputData = input.value;
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    
        const response = await fetch(url);
        const data = await response.json();

        let h2_title = document.querySelector(".h2-title");
        h2_title.textContent = `${data.total}+ images of ${inputData}`

        const results = data.results
    
        if(page === 1){
            searchResults.innerHTML = ""
        }
    
        results.map( (result) => {
            const imageWraper = document.createElement("div");
            imageWraper.classList.add("result-div");
    
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;
    
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.innerHTML = `<i class="fa-solid fa-arrow-down"></i>`


            imageWraper.appendChild(image);
            imageWraper.appendChild(imageLink);
            searchResults.appendChild(imageWraper);
        })
    
        page++
        if(page > 1){
            showMoreDiv.style.display = "flex";
        }
}

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        page = 1;
        searchImages();
    })
    
    showMoreBtn.addEventListener("click", () => {
        searchImages();
    })