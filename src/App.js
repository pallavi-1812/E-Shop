import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

    const handleCartQty = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, { quantity });
        setCart(response.cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const response = await commerce.cart.remove(productId);
        setCart(response.cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(products);

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} handleAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart cart={cart}
                            handleEmptyCart={handleEmptyCart}
                            handleCartQty={handleCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;

