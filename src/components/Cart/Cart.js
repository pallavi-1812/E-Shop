import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import useStyles from './styles';

const Cart = ({ cart, handleCartQty, handleRemoveFromCart, handleEmptyCart }) => {

    const classes = useStyles();
    const isEmpty = !cart.total_unique_items;

    const FilledCart = () => {
        return (
            <>
                <Grid container spacing={3}>
                    {cart.line_items.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} handleCartQty={handleCartQty} handleRemoveFromCart={handleRemoveFromCart} />
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.cardDetails}>
                    <Typography variant="h4">
                        Subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <Button className={classes.emptyButton} size="large" variant="contained" type="button" color="secondary" onClick={handleEmptyCart}>
                        Empty Cart
                    </Button>
                    <Button className={classes.checkoutButton} size="large" variant="contained" type="button" color="primary">
                        Checkout
                    </Button>
                </div>
            </>
        )
    }
    if (!cart.line_items) return 'Loading';
    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography variant="h6" className={classes.title}>Your Shopping Cart</Typography>
            {isEmpty ? (
                <>
                    <Typography variant="subtitle1" gutterBottom>
                        You have no items in your cart.
                        <Link to="/" className={classes.link}>Start Adding some</Link>!
                    </Typography>
                </>
            ) : <FilledCart />}
        </Container>
    )
}

export default Cart;
