// <form id="search-form">
// <div class="input-wrap">
// <label for="search">Search movies:</label>
// <input type="search" id="search" placeholder="Search for a movie" />
// <button>Search</button>
// </div>
// </form>

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

searchLabel.style.display = "block";
searchLabel.style.fontSize = "5rem";
searchLabel.style.fontWeight = "bold";
searchLabel.style.opacity = "0.05";
searchLabel.style.marginBottom = "-48px";

searchInput.style.cssText = `font-size: 2em;
border: 0 transparent;
border-bottom: 2px solid slategray;
display: inline-block;
`;

const buttonStyles = window.getComputedStyle(searchBtn);

console.log(buttonStyles.overlfow);

console.log(searchLabel.offsetWidth);
console.log(searchLabel.offsetHeight);
console.log(searchLabel.offsetTop);

console.log(searchLabel.getBoundingClientRect());

const scrollDiv = document.createElement("div");

scrollDiv.style.height = "200vh";

document.body.append(scrollDiv);

const topAnchor = document.createElement("a");

// The best way
// topAnchor.setAttribute("href", `#search-form`);
// document.body.style.scrollBehavior = "smooth";

topAnchor.setAttribute("href", ``);
topAnchor.innerText = "^ To top ^";

// ...or next best
// topAnchor.onclick = (event) => {
//     event.preventDefault();
//     searchForm.scrollIntoView({ behavior: "smooth" });
// };

// ...or not the best
const scrollAnimation = (destinationElement) => {
    const destination = destinationElement.offsetTop;
    let currentScroll = document.scrollingElement.scrollTop;

    console.log(document.scrollingElement.scrollTop);

    const scrollThePage = () => {
        if (currentScroll > destination) {
            document.scrollingElement.scrollBy(0, -5);
            currentScroll = document.scrollingElement.scrollTop;

            window.requestAnimationFrame(scrollThePage);
        }
    };

    window.requestAnimationFrame(scrollThePage);
};

topAnchor.onclick = (event) => {
    event.preventDefault();
    scrollAnimation(searchForm);
};

document.body.append(topAnchor);
