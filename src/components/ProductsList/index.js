import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProductItem from "../ProductItem";
import Image from "../../assets/images/backgroundFooter.JPG";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    maxWidth: "98%",
    margin: "40px auto",
  },
  back: {
    // marginTop: 40,
    width: "100%",
    height: "auto",
    // backgroundColor: "rgba(200,255,255,1)",

    // backgroundColor: "rgba(0,0,0,0.9)",
    padding: 24,
  },
}));

export default function ProductsList({ products }) {
  const classes = useStyles();

  return (
    <div className={classes.back}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <ProductItem data={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
