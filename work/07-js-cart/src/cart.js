import state from "./state";
import render from "./render";

const appEl = document.querySelector("#app");

appEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("cartView")) {
		state.viewCart = !state.viewCart;
		render();
		return;
	}
    if (e.target.classList.contains("addCart")) {
        const index = e.target.dataset.index
        if (state.products[index].count === 0) {
            state.products[index].count = 1
        } else {
            state.products[index].count += 1
        }
        render()
        return
    }
    if (e.target.classList.contains("addProduct")) {
        const index = e.target.dataset.index
        state.products[index].count += 1
        render()
        return
    }
    if (e.target.classList.contains("removeProduct")) {
        const index = e.target.dataset.index
        state.products[index].count -= 1
        render()
        return
    }
    if (e.target.classList.contains("checkOut")) {
        state.products.forEach((product) => {
            product.count = 0
        })
        render()
        return
    }
});

render();