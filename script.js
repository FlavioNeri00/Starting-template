const buttonChange = document.getElementById("change");
const buttonLoad = document.getElementById("load");
const div = document.getElementById("head-div");

const newCard = (elem) => `
<div class="col-md-4">
<div class="card mb-4 shadow-sm" id="card">
  <a href="./details.html?id=${elem.id}/"><img src=${elem.src.medium} class=card-img-top alt=${elem.alt} /></a>
  <div class="card-body">
   <a href="./details.html?id=${elem.id}/" > <h5 class="card-title">${elem.alt}</h5></a>
    <p class="card-text">
      This is a wider card with supporting text below as a natural lead-in to additional content. This
      content is a little bit longer.
    </p>
    <div class="d-flex justify-content-between align-items-center">
      <div class="btn-group">
        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" id="delete" onclick="deleteElem()">Hide</button>
      </div>
      <small class="text-muted">${elem.id}</small>
    </div>
  </div>
</div>
</div>
`;

const deleteElem = (event) => {
  event.currentTarget.closest(".col").remove();
};

console.log(buttonChange);
console.log(buttonLoad);
const fetchingPhotos = async () => {
  try {
    const resp = await fetch("https://api.pexels.com/v1/search?query=Sea&per_page=9", {
      headers: {
        Authorization: "IccvhsgpbUZmH0LLxuIIWiuz62kHOxEk75je8pMDtlKVK9o9S8cZf1jv",
      },
    });
    if (resp.ok) {
      const data = await resp.json();
      const photo = data.photos;

      div.innerHTML = "";
      console.log(photo);
      photo.forEach((elem) => (div.innerHTML += newCard(elem)));
    }
  } catch (error) {
    console.log(error);
  }
};

buttonLoad.onclick = fetchingPhotos;

const fetchingPhotosSecondary = async () => {
  try {
    const resp = await fetch("https://api.pexels.com/v1/search?query=Tiger&per_page=9", {
      headers: {
        Authorization: "IccvhsgpbUZmH0LLxuIIWiuz62kHOxEk75je8pMDtlKVK9o9S8cZf1jv",
      },
    });
    const data = await resp.json();
    const photo = data.photos;
    console.log(photo);
    div.innerHTML = "";
    photo.forEach((elem) => (div.innerHTML += newCard(elem)));

    const deleteBtn = document.getElementById("delete");
    deleteBtn.onclick = remove();
    console.log(deleteBtn);
  } catch (error) {
    console.log(error);
  }
};

buttonChange.onclick = fetchingPhotosSecondary;

let searchQuery;
const searchingQuery = (e) => {
  searchQuery = e.target.value;
  console.log(e.target.value);
};

const search = () => {
  SearchImgByQuery(searchQuery);
};

const SearchImgByQuery = async (query) => {
  try {
    const resp = await fetch("https://api.pexels.com/v1/search?query=" + query, {
      headers: {
        Authorization: "IccvhsgpbUZmH0LLxuIIWiuz62kHOxEk75je8pMDtlKVK9o9S8cZf1jv",
      },
    });

    if (resp.ok) {
      const data = await resp.json();
      const photo = data.photos;
      console.log(photo);
      div.innerHTML = "";
      photo.forEach((elem) => (div.innerHTML += newCard(elem)));
    }
  } catch (error) {
    console.log(error);
  }
};

const form = document.querySelector("form");

form.addEventListener("submit", SearchImgByQuery);
