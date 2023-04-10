let ApiUrl = 'https://stepprojects.ge/'

function Segment(){
    let page = window.location.href.split('/');
    page = page[page.length - 1]
    
    return page;
}

async function GetProductDet() {
    let id = Segment().split('?')[1];
 
    let Products = await fetch(ApiUrl + "rest/product/"+id, {
      method: "GET",
    });
  
   return await Products.json();
}

async function DisplayDetails(){
    if(Segment().split('?')[0] !== 'details.html'){
        return false
    }
    let myProd = await GetProductDet();

    let img = document.querySelector('.poster');
    let image = new Image();
    let src = myProd.pic != null ? 'data:image/png;base64,'+ myProd.pic : 'imgs/placeholder.png'
    image.src =  src;
    img.appendChild(image);
    document.querySelector('.productinfo h1').innerHTML = myProd.name;
    document.querySelector('.productinfo p').innerHTML = myProd.description;
    document.querySelector('.pricecol').innerHTML = myProd.price;

    let showMore = document.querySelector(".showmore");

    showMore?.addEventListener("click", (e) => {
    e.preventDefault();
    showMore.innerText = 
    showMore.innerText == "Show More" ? "Show Less" : "Show More";
    document.querySelector(".productinfo p").classList.toggle("show");
});
}
DisplayDetails();



function SetStar(){
    let allstar = document.querySelectorAll('.star img');
    allstar.forEach(el=>{
      el.addEventListener('click', function(){
        let active = document.querySelector('.active');
        active?.classList.remove('active')
        this.classList.add('active')
      })
    })

 }

SetStar();
function starhover(){

  if (Segment() !== 'cards.html' && Segment().split('?')[0] !== 'details.html') {
    return false;
  } 
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
