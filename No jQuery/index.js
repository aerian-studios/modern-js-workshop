/*
<form id="search-form">
    <div class="input-wrap">
        <label for="search">Search movies:</label>
        <input type="search" id="search" placeholder="Search for a movie" />
        <button>Search</button>
    </div>
</form>
*/

const searchForm = document.createElement("form");

searchForm.id = "search-form";

const wrapperDiv = document.createElement("div");

wrapperDiv.className = "uninitialised foo";

searchForm.appendChild(wrapperDiv);
console.log(wrapperDiv.classList);

const classes = ["input-wrap", "another-class"];

searchForm.children[0].classList.add(...classes);
console.log(wrapperDiv.classList);

const classesToRemove = ["uninitialised", "non-class"];

wrapperDiv.classList.remove(...classesToRemove);

console.log(wrapperDiv.classList);

wrapperDiv.classList.toggle("another-class");
console.log(wrapperDiv.classList);
wrapperDiv.classList.toggle("another-class");
console.log(wrapperDiv.classList);

const searchInput = document.createElement("input");
const searchId = "search";

searchInput.id = searchId;
searchInput.setAttribute("type", "search");
searchInput.setAttribute("placeholder", "Search for a movie");

const searchLabel = document.createElement("label");

searchLabel.setAttribute("for", searchId);
searchLabel.innerText = "Search movies";

const searchBtn = document.createElement("button");

searchBtn.textContent = "Search";

wrapperDiv.append(searchLabel);
wrapperDiv.append(searchInput);

document.body.prepend(searchForm);

searchInput.insertAdjacentElement("afterend", searchBtn);

const onClick = (event) => {
    event.preventDefault();
    console.log(searchInput.value);
};

searchBtn.addEventListener("click", onClick);
