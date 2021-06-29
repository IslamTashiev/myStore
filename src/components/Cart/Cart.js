import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { calcTotalPrice } from "../../helpers/calcPrice";
import { storeContext } from "../../contexts/StoreContext";
import { Link } from "react-router-dom";
import cancel from "../../assets/icons/cancel.svg";
import blueGrey from "@material-ui/core/colors/blueGrey";
// import { Table, InputGroup, Button } from "react-bootstrap";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  paper: {
    maxWidth: 1000,
    margin: "40px auto",
  },
  btn: {
    maxWidth: 100,
    width: 70,
    height: 50,
    marginLeft: 140,
    marginTop: 20,
    borderRadius: 10,
    color: blueGrey[700],
  },
});

export default function Cart() {
  const classes = useStyles();
  const { cart, getCart, changeProductCount, addProductToCart, products } =
    useContext(storeContext);

  const data = products.map((product) => product);

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Link to="/">
        <Button className={classes.btn}>Home</Button>
      </Link>
      <TableContainer component={Paper} className={classes.paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Фото</TableCell>
              <TableCell align="right">Название</TableCell>
              <TableCell align="right">Цена</TableCell>
              <TableCell align="right">Количество</TableCell>
              <TableCell align="right">Сумма</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.products ? (
              <>
                {cart.products.map((elem) => (
                  <TableRow key={elem.item.id}>
                    <TableCell>
                      <img
                        style={{ width: "50px" }}
                        src={elem.item.images}
                        alt=""
                      />{" "}
                    </TableCell>
                    <TableCell align="right">{elem.item.title}</TableCell>
                    <TableCell align="right">{elem.item.price}</TableCell>
                    <TableCell align="right">
                      <input
                        type="number"
                        value={elem.count}
                        onChange={(e) =>
                          changeProductCount(e.target.value, elem.item.id)
                        }
                      />
                    </TableCell>

                    <TableCell align="right">
                      <img
                        onClick={() => addProductToCart(data)}
                        style={{ width: 20 }}
                        src={cancel}
                      />
                    </TableCell>
                    <TableCell align="right">{elem.subPrice}</TableCell>
                  </TableRow>
                ))}
              </>
            ) : null}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>
                <Typography variant="h5">Итого: </Typography>{" "}
              </TableCell>
              {cart.products ? (
                <TableCell align="right">
                  <Typography variant="h5">
                    {" "}
                    {calcTotalPrice(cart.products)}{" "}
                  </Typography>{" "}
                </TableCell>
              ) : null}
              <TableCell colSpan={2}>
                <Link to="/order">
                  <Button variant="contained" color="primary">
                    Оформить
                  </Button>
                  {/* <Button>pay</Button> */}
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
