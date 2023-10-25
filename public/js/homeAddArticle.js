function newText(name, t, img){
    let text = `
    <div class="article">
        <h3>${name}</h3>
        <div class="content">
          <p>${t}</p>
          <img class="imagination" src="${img}" alt="image"/>
        </div>
      </div>`
    return text;
}

const button = document.getElementById("submitButtonToAddArticle");
const content = document.getElementById("content")
const txt = document.getElementById("text");
const img = document.getElementById("img");

button.addEventListener("click", () => {
    const selectedImage = img.files[0];
    if (selectedImage) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgSrc = event.target.result;
            content.insertAdjacentHTML("beforeend", newText("admin", txt.value, imgSrc));
        };
        reader.readAsDataURL(selectedImage);
    } else {
        console.error("No image selected");
    }
});