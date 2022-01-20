const categories = document.querySelector(".cat");
const dropMenu = document.getElementById("drop");
const plusicon = document.getElementById("plus")
const closeMenu = document.querySelector(".fa-arrow-circle-left")
const leftMenu = document.getElementById("left")
const content = document.querySelectorAll(".title")
const searchBox = document.getElementById("search");
const searchD = document.querySelector(".searchDiv");
const searchUl = document.querySelector(".searchContent")
let buttons = document.querySelectorAll('.list')
const mobileBtn = document.querySelector('.mobile');
const otherBtn = document.querySelector('.other')
const dark = document.querySelector('.darkAnd')
const vsTest = document.getElementById('vs')
const clearBtn = document.querySelector('.clear')
let cart = []
let buttonsDom = []
let hpCharacaters = []




const request = new Request();
const ui = new UI();







window.addEventListener('DOMContentLoaded', (e) => {
  request.get("product.json").then(response => {
    hpCharacaters = [...response];
    ui.prod(hpCharacaters)
    Storage.saveProducts(hpCharacaters)



    ui.addToCart()
    ui.cartLogic()
    ui.setupAPP()

    if (localStorage.getItem('dark')) {
      vsTest.className = 'darkMood'
    }
  })



});




dark.addEventListener('click', () => {
  if (vsTest.className === 'con') {

    vsTest.className = 'darkMood'

    localStorage.setItem('dark', true)



  } else {

    vsTest.className = 'con'
    localStorage.removeItem('dark')


  }

  vsTest.style.transition = "400ms all"
})





searchBox.addEventListener('keyup', (e) => {

  const searchString = e.target.value.toLowerCase();

  const filtered = hpCharacaters.filter(item => {
    return (item.name.toLowerCase().includes(searchString) ||
      item.brand.toLowerCase().includes(searchString)
    )

  })







  searchBox.addEventListener('input', () => {
    if (searchString.length > 0) {


      filtered.map(item => {



        const html = `<li class="cart-list-items d-flex justify-content-between align-items-center">
  <div class="mr-1"><img class="rounded" src="${item.img}" width="70"></div>
  <div class="d-flex flex-column align-items-center product-details"><span
      class="font-weight-bold">${item.name}</span>
    <div class="d-flex flex-row product-desc">
    </div>
  </div>
</li>`


        searchD.style.visibility = "visible"
        searchUl.innerHTML = html;
      })

    }
    if (searchString.length < 2) {
      searchD.style.visibility = "hidden"


    }

    this.addEventListener('click', () => {
      searchD.style.visibility = "hidden"
      searchBox.value = ""
    })

  })








  e.preventDefault()

})







closeMenu.addEventListener("click", cl)










buttons.forEach(button => {
  button.addEventListener('click', function () {
    buttons.forEach(btn => btn.classList.remove('active'))
    this.classList.add('active')
  })

})






// dropMenu.style.display = "none"



// function open() {



//   dropMenu.className = dropMenu.className !== 'show' ? 'show' : 'hide';
//   if (dropMenu.className === 'show') {
//     dropMenu.style.display = 'block';

//     window.setTimeout(function () {
//       dropMenu.style.opacity = 1;
//       dropMenu.style.transform = 'scale(1)';
//     }, 0);
//   }
//   if (dropMenu.className === 'hide') {
//     dropMenu.style.opacity = 0;
//     dropMenu.style.transform = 'scale(0)';
//     dropMenu.style.display = 'none';

//     window.setTimeout(function () {
//       dropMenu.style.display = 'none';
//     }, 700); // timed to match animation-duration
//   }




// }






function cl() {


  content.forEach((hi) => {
    if (hi.className === "title") {
      hi.className = "none"

      leftMenu.style.width = "50px"



      document.getElementById("lm").style.transform = "rotate(180deg)"
    } else {
      hi.className = "title"
      leftMenu.style.width = "250px"
      document.getElementById("lm").style.transform = "rotate(0deg)"

    }
    leftMenu.style.transition = "400ms all"
    closeMenu.style.transition = "400ms all"
  })

}