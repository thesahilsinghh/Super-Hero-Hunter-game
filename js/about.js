let characterId = localStorage.getItem("id");
let tileDiv = document.getElementById("template-div");
localStorage.removeItem(characterId);

fetch(
  `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1709731881264&apikey=e515610bf057e9bc90e3b3aaafa594a0&hash=6f5a3d63e8be5f25f504e0877826080b`
)
  .then((res) => {
    return res.json();
  })
  .then((hero) => {
    return hero.data.results[0];
  })
  .then((x) => {
    console.log(x);
    let comicsName = "";
    x.comics.items.forEach((element) => {
      comicsName += `, ` + element.name;
    });
    let seriesName = "";
    x.series.items.forEach((element) => {
      seriesName += `, ` + element.name;
    });
    seriesName = seriesName.substring(2);
    comicsName = comicsName.substring(2);

    tileDiv.innerHTML = `<div class="tile-div-img">
    <img class="tile-img" src="${x.thumbnail.path}.${x.thumbnail.extension}" alt="">
  </div>
  <div class="tile-des">
    <p>NAME : ${x.name}</p>
    <p>ID : ${x.id}</p>
    <p>DESCRIPTION :${x.description}</p>
    <p>COMICS : ${comicsName}</p>
    <p>SERIES : ${seriesName}</p>
    <button id="${x.id}" class="fav-add">Add to Favourite</button>
  </div>
</div>`;
    document.getElementById(`${x.id}`).addEventListener("click", () => {
      localStorage.setItem(x.id, "true");
    });

    tileDiv.append(tile);
  });
