//fetch
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const listTile = document.getElementById("template-div");
let result = [];

let arr = [];

fetch(
  `https://gateway.marvel.com/v1/public/characters?ts=1709731881264&apikey=e515610bf057e9bc90e3b3aaafa594a0&hash=6f5a3d63e8be5f25f504e0877826080b`
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    return data.data.results;
  })
  .then((data) => {
    result = data.map((x) => {
      const tile = document.createElement("div");
      tile.classList.add("template");
      tile.innerHTML = `
      <div>
      <img src="${x.thumbnail.path}.${
        x.thumbnail.extension
      }" class="template-img">
          
      <p class="template-name"> Name : ${x.name}</p>
      <p class="template-name">Id : ${x.id}</p>
      <p class="template-comics">Comics Available : ${x.comics.available}</p>
      </div>
      <button onclick="showAbout(${x.id})" class="fav-add">About</button>
      <button id="${x.id}" class="fav-add" onclick="addtoFav(${x.id})">Add to Favourite</button>
  `;

      listTile.appendChild(tile);
      return {
        name: x.name,
        id: x.id,
        tile,
        x
      };
    });
  });

  function addtoFav(id) {
    const favButton = document.getElementById(id);
    favButton.textContent = 'Added to Favourite';
    favButton.disabled = true;

    let data; 
    result.forEach((val)=>{
      if(val.id===id){
        data =val.x;
      }
    }); 
    arr=[...arr,data];
    localStorage.setItem("fav-list",JSON.stringify(arr));
   }
//about
function showAbout(x) {
  localStorage.setItem("id", x);
  window.location.assign("about.html");
}

//search bar
document.getElementById("search-bar").addEventListener("input", (e) => {
  const val = e.target.value.toLowerCase();
  result.forEach((x) => {
    let idname = x.name.toLowerCase();
    let Xid=''+x.id;
    const isVisi = idname.includes(val)||Xid.includes(val);
    x.tile.style.display = isVisi ? "block" : "none";
  });
});
////////////////////////////////////
