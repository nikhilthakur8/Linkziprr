const allmyLink = document.getElementsByClassName("clipboardButton");
Array.from(allmyLink).forEach((button) => {
  button.addEventListener("click", (e) => {
    const shortId = button.parentElement.parentElement.children[1].innerHTML;
    const copyText = `linkziprr.vercel.app/${shortId.trim()}`;
    navigator.clipboard.writeText(copyText);
    button.classList.add("active");
    setTimeout(() => {
      button.classList.remove("active");
    }, 2000);
    e.preventDefault();
  });
});
let linkText = document.getElementsByClassName("redirectLink");
Array.from(linkText).forEach((link) => {
  link.innerHTML = `${link.innerText.slice(0, 30)}...`;
});
const allMyDelete = document.getElementsByClassName("deleteButton");

Array.from(allMyDelete).forEach((button) => {
  button.addEventListener("click", () => {
    const shortId = button.parentElement.parentElement.children[1].innerHTML;
    fetch(`https://linkziprr.vercel.app/url/delete/${shortId.trim()}`, {
      method: 'DELETE',
      mode: 'cors', // Include this line to enable CORS
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers your server may require
      },
    })
    .then((res) => res.json())
    .then((deletedElement) => {
      console.log(deletedElement);
      button.parentNode.parentNode.remove();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
});

