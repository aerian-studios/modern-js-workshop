console.log("Hi final project");

const button = document.getElementById("search-button");

console.log(button);

const clickHandler = () => {
    console.log("Clicked");
    const textField = document.getElementById("search-movies");

    console.log(textField.value);

    document.getElementById("search-results").innerHTML = textField.value;
};

button.onclick = clickHandler;

console.log(button.onclick);
