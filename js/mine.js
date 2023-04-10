let getCat = (url) =>

new Promise((resolve, reject) =>
fetch(url)
.then(response => response.json())
.then(json => resolve(json))
.catch(error => reject(error))
)

getCat('https://stepprojects.ge/rest/categories')
.then(data =>{
  for( let cat of data){
    let HtmlCat = `
    <li>
    <a href="cards.html">${cat.name} <i class="fa-solid fa-angle-right"></i></a>
     <ul>

     </ul>
    </li>
`;
document.querySelector('.categoryul').innerHTML += HtmlCat;
  }
})






let getData = (url) =>

new Promise((resolve, reject) =>
fetch(url)
.then(response => response.json())
.then(json => resolve(json))
.catch(error => reject(error))
)



getData('https://stepprojects.ge/rest/products')
.then(data =>{
 let i = 0;

    for(let key in data){

        let value = data[key];
      let image = new Image();
      let src = value.pic != null ? 'data:image/png;base64,'+ value.pic : 'imgs/placeholder.png'
      image.src =  src;
        let card = `
        <div class="col-lg-4 col-md-6 col-12">
        <div class="card mb-5 productcard">
 <div class="card-body">
   <h5><a href="details.html?${value.id}"> ${value.name} </a></h5>
   <h6></h6>
   <p class="card-text">${value.price} GEL </p>
 </div>
</div>
</div>`
document.querySelector('.contentrow').innerHTML += card
document.querySelectorAll('.productcard')[i].prepend(image)
i++;

}
})