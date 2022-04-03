const BASE_URL = "https://api.thecatapi.com/v1/images/search";
const catBtn = document.getElementById("change-cat");
const catImg = document.getElementById("cat");

/* const getCats = async () => {
    const data = await fetch(BASE_URL);
    // console.log(data);
    const json = await data.json();
    console.log(json);
    return json[0].url;
};

const loadImg = async () => {
    catImg.src = await getCats(); 
};

catBtn.addEventListener('click', loadImg);

loadImg();
 */
const fetchCats = () => {
    fetch(BASE_URL)
        .then((res) => res.json())
        .then((res) => (catImg.src = res[0].url));
};

catBtn.addEventListener("click", fetchCats);

fetchCats();
