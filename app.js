const form = document.querySelector("#searchForm"); 
const container = document.querySelector(".container2");

form.addEventListener("submit", async function(e){
        try {
            e.preventDefault();
            let input = form.elements.query;
            const config = { params: {q: input.value}};
            const res = await axios.get(`http://api.tvmaze.com/search/shows`,config);
            await makeImages(res.data);
            input.value= "";
        }catch {
            const div = document.createElement("div");
            div.innerText = "Could not find the tv show";
            document.body.append(div);
        }
})


const makeImages = (shows) => {
    for(let result of shows){
        if(result.show.image){
            const div = document.createElement("div")
            div.classList.add("d-inline-block", "m-3");
            const img = document.createElement("img");
            img.src = result.show.image.medium;
            img.classList.add("img-fluid");
            const label = document.createElement("label");
            label.classList.add("d-block","text-center");
            label.innerText = result.show.name;
            div.append(img);
            div.append(label);
            container.append(div);
        }
    }
}