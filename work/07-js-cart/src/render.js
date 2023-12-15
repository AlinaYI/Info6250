import state from "./state";

const productsEl = document.querySelector(".products");
const cartEl = document.querySelector(".cartlist");

function render() {
	if (state.viewCart) {
		renderCart(cartEl);
	} else {
		renderEmptyCart(cartEl);
	}
	renderProducts(productsEl);
}

function renderCart(cartEl) {
    const totalCount = state.getTotalCount()
	const cartListHtml = totalCount ? getCartHtml() : `<p>Nothing in the cart</p>`
	cartEl.innerHTML = `<h2>Shopping Cart</h2> ${cartListHtml}`;
}

function renderEmptyCart(cartEl) {
	cartEl.innerHTML = "";
}

function renderProducts(productsEl) {
    const listingHtml = getListingHtml()
    const viewCartBtn = getViewCartBtnHtml()
	const productsHtml = `<ul class="listings">${listingHtml}</ul> ${viewCartBtn}`;
	productsEl.innerHTML = productsHtml;
}

function getListingHtml() {
    const listings = state.products.map((product, index) => {
        return `
            <li class="product">
                <h3 class="product-name" data-index="${index}">${product.name}</h3>
                <img class="product-img" src=${product.img}/>
                <p class="product-price">Price: $${product.price}</p>
                <button 
                data-index="${index}" class="addCart" type="button">
                Add to cart
                </button>
            </li>
        `
    }).join("");

    return listings;
}

function getViewCartBtnHtml() {
    const totalCount = state.getTotalCount()
    const viewCartText = totalCount ? `View Cart (${totalCount})` : "View Cart"
    const btnText = state.viewCart ? "Hide Cart" : viewCartText

    return `
    <button type="button" class="cartView">${btnText}</button> `
}

function getCartHtml() {
    let cartHtml = state.products
		.map((product, index) => {
			const inCartClass = product.count ? "in-cart" : "not-in-cart";
			return `
                <li class="cart ${inCartClass}">
                    <h4 class="cart-name" data-index="${index}">
                    ${product.name}
                    </h4>
                    <img class="cart-img" src=${product.img}>
                    <div class="count-group">
                        <button 
                        data-index="${index}" class="removeProduct" type="button">
                        -
                        </button>
                        <span class="cart-count">${product.count}</span>
                        <button 
                        data-index="${index}" class="addProduct" type="button">
                        +
                        </button>
                    </div>
                    <p>Price: $${state.getProductPrice(index)}</p>
                </li>
        `;
		})
		.join("");

    cartHtml = `<ul class="carts">${cartHtml}</ul>`
    const totalPriceHtml = `<p>Total Price: $${state.getTotalPrice()}</p>`
    const checkoutBtn = `<button type="button" class="checkOut">Checkout</button>`
    cartHtml += totalPriceHtml
    cartHtml += checkoutBtn

    return cartHtml
}

export default render;