const favorite = document.getElementById('favorite');
const url = document.getElementById('url')['href'];
const nameProduct = document.getElementById('name').textContent;
const price = document.getElementById('price').textContent;

favorite.addEventListener('click', () => {
  
  const body = {
    url,
    name: nameProduct,
    price,
  };
  console.log(body);
  fetch('/favorite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  })
    .then((res) => res.json())
    .then((data) => {});
});
