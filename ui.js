const cartContent = document.querySelector(".cart-list");
const inHtml = document.querySelector(".productList");

class UI {



  prod(response) {


    response.forEach(pr => {

      document.querySelector(".productList").innerHTML += ` <div class="box">
        <img src=${pr.img} alt="">
        <h2 class="name">${pr.name}</h2>

        <button class="buy fas fa-cart-plus" type ="button" data-id=${pr.id}></button> 

        <p class="new">$ ${pr.pricing}</p>
        <div class="boxBottom">

          <table class="table">
            <tbody>
              <tr>
                <th scope="row">.</th>
                <td>Brand</td>
                <td>${pr.brand}</td>
              </tr>
              <tr>
                <th scope="row">.</th>
                <td>Production year</td>
                <td>${pr.year}</td>
              </tr>
              <tr>
                <th scope="row">.</th>
                <td>Operation system</td>
                <td>${pr.os}</td>
              </tr>

            </tbody>
          </table>

        </div>
      </div>`

    });






  }


  addToCart() {
    const buttons = [...document.querySelectorAll(".buy")];
    buttonsDom = buttons;
    buttons.forEach(button => {
      let id = button.dataset.id;
      let inCart = cart.find(item => item.id === id)
      if (inCart) {
        button.setAttribute("disabled", "disabled");
        button.style.opacity = "0.3"
      } else {
        button.addEventListener("click", event => {
          event.target.disabled = true;
          event.target.style.opacity = "0.3"

          //get product
          let cartItem = {
            ...Storage.getProduct(id),
            amount: 1
          }
          // ad to cart 
          cart = [...cart, cartItem];

          //save cart to storage
          Storage.saveCart(cart)


          //save cart values

          this.saveCartValues(cart);

          //display cart item
          this.addCartItem(cartItem);

          //show cart
          this.showCart();


        })
      }
    })

  }

  saveCartValues(cart) {

    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map(item => {
      tempTotal += item.pricing * item.amount;
      itemsTotal += item.amount
    })

    document.querySelector(".tot").innerText = parseFloat(tempTotal.toFixed(2));
    document.querySelector(".quantitiy").textContent = itemsTotal;
    if (itemsTotal > 0) {
      clearBtn.style.display = "block"

    } else {
      clearBtn.style.display = "none"
    }
  }


  addCartItem(item) {


    cartContent.innerHTML += `
    <li class="cart-list-items d-flex justify-content-between align-items-center">
    <div class="mr-1"><img class="rounded" src="${item.img}" width="70">
    </div>
    <div class="d-flex flex-column align-items-center product-details"><span
        class="font-weight-bold">${item.name}</span>
      <div class="d-flex flex-row product-desc">


      </div>
    </div>
    <div class="d-flex flex-row align-items-center mx-3 qty"><button class="quantity-minus fa fa-minus" data-id=${item.id}></button>
      <h5 class="text-grey mt-1 mr-1 ml-1"><span class="px-2">${item.amount}</span></h5> <button
        class="quantity-plus fa fa-plus" data-id=${item.id}></button>
    </div>
    <div>
      <h5 class="text-grey">$ ${item.pricing}</h5>
    </div>
    <div class="d-flex align-items-center mx-3"><i class="fa fa-trash mb-1 text-danger" data-id=${item.id}></i>
    </div>
  </li>
    
    
    `

  }

  showCart() {
    document.getElementById("btn-cart").click()
  }
  setupAPP() {
    cart = Storage.getCart();
    this.saveCartValues(cart);
    this.populateCart(cart)
  }
  populateCart(cart) {
    cart.forEach(item => this.addCartItem(item));
  }
  cartLogic() {

    document.querySelector(".clear").addEventListener("click", () => {
      this.clearCart()
    })
    cartContent.addEventListener("click", event => {

      if (event.target.classList.contains("fa-trash")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        removeItem.parentElement.parentElement.remove()
        this.removeItem(id);
      } else if (event.target.classList.contains("quantity-minus")) {

        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount = tempItem.amount - 1;


        if (tempItem.amount > 0) {

          Storage.saveCart(cart);
          this.saveCartValues(cart);
          lowerAmount.nextElementSibling.innerText = tempItem.amount;

        } else {

          lowerAmount.parentElement.parentElement.remove()
          this.removeItem(id);
        }

      } else if (event.target.classList.contains("quantity-plus")) {

        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.saveCartValues(cart);
        lowerAmount.previousElementSibling.innerText = tempItem.amount;

      }
    })

  }

  clearCart() {
    let cartItems = cart.map(item => item.id)
    cartItems.forEach(id => this.removeItem(id))
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0])
    }
  }

  removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    this.saveCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.style.opacity = "1";
  }

  getSingleButton(id) {
    return buttonsDom.find(button => button.dataset.id === id)
  }


}