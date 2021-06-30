import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";

const App = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
    }
    console.log(cart);

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(products);

    return (
        <div>
            <Navbar totalItems={cart.total_items} />
            {/* <Products products={products} handleAddToCart={handleAddToCart} /> */}
            <Cart cart={cart} />
        </div>
    )
}

export default App;

