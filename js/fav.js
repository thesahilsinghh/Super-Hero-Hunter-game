let characterId = localStorage.getItem("id");
let listTile = document.getElementById("template-div");

  let arr = localStorage.getItem("fav-list");
  arr = JSON.parse(arr);
  console.log(arr);

  display();
  function display(){ 
  for (let i = 0; i < arr.length; i++) {

    let x = arr[i];

    const tile = document.createElement("div");
    tile.classList.add("template");
    tile.classList.add(x.id);
    tile.innerHTML = `
      <div>
      <img src="${x.thumbnail.path}.${x.thumbnail.extension}" class="template-img">
          
      <p class="template-name"> Name : ${x.name}</p>
      <p class="template-name">Id : ${x.id}</p>
      <p class="template-comics">Comics Available : ${x.comics.available}</p>
      </div>
      <button   onclick="remove(${x.id})" class="fav-add">Remove</button>
      `;
    listTile.appendChild(tile);
  }

//   localStorage.removeItem("fav-list");
}
function remove(id) {

 
    //e.firstElementChild can be used. 
    let child = listTile.lastElementChild;
    while (child) {
        listTile.removeChild(child);
        child = listTile.lastElementChild;
    }
 
    let idx=arr.map(item => item.id).indexOf(id);
 arr.splice(idx,1);
 localStorage.setItem('fav-list',JSON.stringify(arr));
 display();



}
