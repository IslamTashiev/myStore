// import { Field } from 'formik';
import React from "react";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";
// import classes from './Payment.module.css'
import Styles from './Styles'
import Button from '@material-ui/core/Button';

// import { Form, Field } from 'react-final-form'
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
} from "./cardUtils";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = () => {
    // await sleep(300)
    // window.alert(JSON.stringify(values, 0, 2))
};

export default class PaymentForm extends React.Component {
    state = {
        cvc: "",
        expiry: "",
        focus: "",
        name: "",
        number: "",
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <Styles>
                <div id="PaymentForm">
                    <Form
                        onSubmit={onSubmit}
                        render={({
                            handleSubmit,
                            form,
                            submitting,
                            pristine,
                            values,
                            active
                        }) => {
                            return (
                                <form onSubmit={handleSubmit}>
                                    <Card
                                        number={values.number || ''}
                                        name={values.name || ''}
                                        expiry={values.expiry || ''}
                                        cvc={values.cvc || ''}
                                        focused={active}
                                    />
                                    <div>
                                        <Field
                                            name="number"
                                            component="input"
                                            type="text"
                                            pattern="[\d| ]{16,22}"
                                            placeholder="Номер карты"
                                            format={formatCreditCardNumber}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            name="name"
                                            component="input"
                                            type="text"
                                            placeholder="Имя на карте"
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            name="expiry"
                                            component="input"
                                            type="text"
                                            pattern="\d\d/\d\d"
                                            placeholder="Действительно до"
                                            format={formatExpirationDate}
                                        />
                                        <Field
                                            name="cvc"
                                            component="input"
                                            type="text"
                                            pattern="\d{3,4}"
                                            placeholder="CVC код"
                                            format={formatCVC}
                                        />
                                    </div>
                                    <div className="buttons"> <Link to="/"><Button type="submit" disabled={submitting}>
                                        Оплатить
                                    </Button></Link>

                                        <Button
                                            type="button"
                                            onClick={form.reset}
                                            disabled={submitting || pristine}
                                        >
                                            Очистить
                                        </Button>
                                    </div>
                                    {/* <h2>Values</h2>
                                <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                                </form>
                            );
                        }}
                    />
                </div >
            </Styles >
        );
    }
}