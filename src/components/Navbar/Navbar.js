import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from "@material-ui/core"
import { ShoppingCart } from "@material-ui/icons"
import useStyles from "./styles";
import navImg from '../../assets/navImg.jpg'

const Navbar = ({ totalItems }) => {

    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed" color="inherit" className={classes.AppBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        <img src={navImg} alt="commerce.js" height="25px" className={classes.image} />
                        Commerce.js
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.menuButton}>
                        <IconButton color="inherit" aria-label="Show cart items">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
