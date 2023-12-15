import React, { useState,useEffect } from "react";
import "./ShoppingCart.css";
import img1 from "./images/animalparty.png";
import img2 from "./images/overcook2.png";
import img3 from "./images/stray.png";

function ShoppingCart(){

    const initialProducts = [
        {
            name: "Anminal Party",
            price: 75.00,
            img: img1,
            count: 0
        },
        {
            name: "Overcooked 2",
            price: 45.00,
            img: img2,
            count: 0
        },
        {
            name: "Stray",
            price: 77.50,
            img: img3,
            count: 0
        }
    ];


    const [products, setProducts] = useState(initialProducts);
    const [viewCart, setViewCart] = useState(false);
    const [checkoutMessage, setCheckoutMessage] = useState("");

    const getTotalCount = () => {
        return products.reduce((total, product) => total + product.count, 0);
    };

    const getProductPrice = (index) => {
        return products[index].price * products[index].count;
    };

    const getTotalPrice = () => {
        return products.reduce((total, product) => total + getProductPrice(products.indexOf(product)), 0);
    };

    const toggleViewCart = () => {
        setViewCart(!viewCart);
    };

    const addProductToCart = (index) => {
        const newProducts = [...products];
        newProducts[index].count += 1;
        setProducts(newProducts);
    };

    const removeProductFromCart = (index) => {
        const newProducts = [...products];
        newProducts[index].count = Math.max(0, newProducts[index].count - 1);
        setProducts(newProducts);
    };

    const checkout = () => {
        const resetProducts = products.map(product => ({ ...product, count: 0 }));
        setProducts(resetProducts);
        setCheckoutMessage("Thank you for your purchase! Enjoy your game!")
        setViewCart(false);
    };

    return (
        <div id="app">
            {viewCart ? (
                <div className="cartlist">
                    <h2>Game Store</h2>
                    <p>Browse and purchase your favorite games right here!</p>
                    <ul className="carts">
                        {products.map((product, index) => product.count > 0 && (
                            <li key={index} className="cart in-cart">
                                <h4>{product.name}</h4>
                                <img src={product.img} alt={product.name} />
                                <div>
                                    <button onClick={() => removeProductFromCart(index)}>-</button>
                                    <span>{product.count}</span>
                                    <button onClick={() => addProductToCart(index)}>+</button>
                                </div>
                                <p>Price: ${getProductPrice(index)}</p>
                            </li>
                        ))}
                    </ul>
                    <p>Total Price: ${getTotalPrice()}</p>
                    <button onClick={checkout}>Checkout</button>
                </div>
            ) : (
                <div className="products">
                    <ul className="listings">
                        {products.map((product, index) => (
                            <li key={index} className="product">
                                <h3>{product.name}</h3>
                                <img src={product.img} alt={product.name} />
                                <p>Price: ${product.price}</p>
                                <button onClick={() => addProductToCart(index)}>Add to cart</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <button onClick={toggleViewCart}>
                {viewCart ? "Hide Cart" : `View Cart (${getTotalCount()})`}
            </button>

            {checkoutMessage && <div className="checkout-message">{checkoutMessage}</div>}
        </div>
    );

}

export default ShoppingCart;