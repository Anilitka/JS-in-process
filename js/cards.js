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

async function BaseFilter(query)  {
  let Response = await fetch(`https://stepprojects.ge/rest/products`+query, {
    method: "GET",

  });
 return await Response.json();
}




let getCardData = (url) =>

new Promise((resolve, reject) =>
fetch(url)
.then(response => response.json())
.then(json => resolve(json))
.catch(error => reject(error))
)


getCardData('https://stepprojects.ge/rest/products')
.then(data =>{
 let i = 0;
    for(let key of data){

      let image = new Image();
      let src = key.pic != null ? 'data:image/png;base64,'+ key.pic : 'imgs/placeholder.png'
      image.src =  src;
      image.classList.add('prodimg');
        let card = `
        <div class="row prods">
        <div class="col-lg-3 ps-lg-0 insimgs">
           
        </div>
        <div class="col-lg-5">
           <div class="text-body">
           <h2><a href="details.html?${key.id}"> ${key.name} </a></h2>
                <div class="star">

                    </div>
                    <small>Reviews ${key.reviewsCount}</small>
           </div>
        </div>
        <div class="col-lg-4">
            <div class="price-sec">
                <p class="mb-0">${key.price} GEL</p>
                <button class="btn addcard" data-id="${key.id}">კალათაში დამატება</button>
            </div>
        </div>
    </div>
        `

document.querySelector('.cardcontentrow').innerHTML += card
document.querySelectorAll('.insimgs')[i].appendChild(image)
i++;

}
})

let getBrand = (url) =>

new Promise((resolve, reject) =>
fetch(url)
.then(response => response.json())
.then(json => resolve(json))
.catch(error => reject(error))
)


getBrand('https://stepprojects.ge/rest/brands')
.then(data =>{
    for(let brand of data){
      let Brand = `
      <div class="form-check">
              <input class="form-check-input" type="radio" name="brandId" value="${brand.id}" id="chk${brand.id}">
              <label class="form-check-label" for="chk${brand.id}">
                  ${brand.name}
              </label>
            </div>
      `;
      document.querySelector('.bybrand').innerHTML += Brand;

}
})
function Segment(){
  let page = window.location.href.split('/');
  page = page[page.length - 1]
  
  return page;
}

function SetStar(){
  if (Segment() !== 'details.html' && Segment().split('?')[0] !== 'cards.html') {
    return false;
  } 
  let stars = document.querySelectorAll('.star img');
  let allstar = document.querySelectorAll('.star img');
  allstar.forEach(el=>{
    el.addEventListener('click', function(){
      let active = document.querySelector('img.active');
      active?.classList.remove('active')
      this.classList.add('active')
    })
  })

}

SetStar();

function starhover(){

  let stars = document.querySelectorAll('.star img');

  stars.forEach((el, index)=>{
    el.addEventListener('mousemove',function(){
   
      let ind = this.getAttribute('data-star')
 
      stars.forEach((st,index)=>{
         if ((index + 1) <= ind) {
        
          st.src = 'imgs/star.svg';
         }else{
          st.src = 'imgs/starempt.svg';
         }
      })

    })
  })
  stars.forEach(el=>{
    el.addEventListener('mouseleave',function(){
      let ind = document.querySelector('.star img.active')?.getAttribute('data-star')
 
      stars.forEach((st,index)=>{
         if ((index + 1) <= ind) {
 
          st.src = 'imgs/star.svg';
         }else{
          st.src = 'imgs/starempt.svg';
         }
      })
    })
  })
}

starhover();





