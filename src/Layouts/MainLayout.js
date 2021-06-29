import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import { useHistory } from "react-router";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { storeContext } from "../contexts/StoreContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Auth from "../components/Auth/Auth";
import logo from "../assets/images/BMW_logo.png";

const drawerWidth = 240;

// kefg
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // backgroundColor: "rgba(0,0,0,0.5)",
    backgroundColor: "#333333",
    // background: "rgb(2,0,36)",
    // background:
    //   "linear-gradient(90deg, rgba(51,51,51,1) 0%, rgba(51,51,21,1) 35%, rgba(255,212,255,1) 100%)",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#333333",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    minHeight: "100vh",
    position: "relative",
  },
  addBtn: {
    position: "fixed",
    top: "90%",
    right: 15,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  navContent: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  brandLogo: {
    width: 56,
    objectFit: "contain",
  },
  logo1: {
    width: "auto",
    display: "flex",
    alignItems: "center",
  },
  brandTitle: {
    color: "#fff",
    textDecoration: "none",
  },
}));

export default function MainLayout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { brands, fetchBrands } = useContext(storeContext);

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.navContent}>
            <NavLink
              className={classes.logo}
              style={{ textDecoration: "none", color: "#fff" }}
              to="/"
            >
              <Typography className={classes.logo1} variant="h6" noWrap>
                <img style={{ width: 40, marginRight: 10 }} src={logo} />
                BMW Center
              </Typography>
            </NavLink>
            <SearchBar />
            <Auth />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List>
          {brands.map((brand) => (
            <Link to={`/brand/${brand.id}`}>
              <ListItem button key={brand.id}>
                <ListItemText style={{ color: "#fff" }} primary={brand.title} />

                <ListItemIcon>
                  {/* <img
                    className={classes.brandLogo}
                    src={brand.logo}
                    alt={`${brand.title} logo`}
                  /> */}
                </ListItemIcon>

              </ListItem>
            </Link>
          ))}
        </List>
        <List>
          <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
            <ListItem button>
              <ListItemText style={{ color: "#fff" }} primary="Корзина" />
              <IconButton color="inherit">
                <ShoppingCartIcon />
              </IconButton>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div style={{ height: 64 }}></div>
        {props.children}
        <Fab
          onClick={() => history.push("/products/create")}
          className={classes.addBtn}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </main>
    </div>
  );
}
