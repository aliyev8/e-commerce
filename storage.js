class Storage {

    static saveProducts(products) {

        if (localStorage.products === null) {
            products = [];
        } else {
            localStorage.setItem("products", JSON.stringify(products));
        }


    }

    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"))
        return products.find(product => product.id === id);
    }

    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    static getCart() {
        return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    }

}