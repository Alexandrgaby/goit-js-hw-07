import { galleryItems } from "./gallery-items.js";
//Change the code above this line
const galleryContainer = document.querySelector(".gallery");

function renderGallery(items) {
  items.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("gallery-item");

    const a = document.createElement("a");
    a.classList.add("gallery-link");
    a.href = item.original;
    a.setAttribute("data-source", item.original);
    a.setAttribute("data-description", item.description);

    const img = document.createElement("img");
    img.classList.add("gallery-image");
    img.src = item.preview;
    img.alt = item.description;

    a.appendChild(img);
    li.appendChild(a);
    galleryContainer.appendChild(li);
  });
}

renderGallery(galleryItems);

galleryContainer.addEventListener("click", (event) => {
  event.preventDefault();

  const target = event.target;
  if (target.nodeName !== "IMG") return;

  const originalUrl = target.parentNode.getAttribute("data-source");
  const description = target.parentNode.getAttribute("data-description");

  const instance = basicLightbox.create(
    `
        <img src="${originalUrl}" alt="${description}">
    `,
    {
      onShow: (instance) => {
        const modalImage = instance.element().querySelector("img");
        modalImage.src = originalUrl;
      },
    }
  );

  instance.show();
});
console.log(galleryItems);
