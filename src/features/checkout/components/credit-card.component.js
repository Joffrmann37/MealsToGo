import React from "react";
import { CreditCardInput } from "react-native-credit-card-input";
import { cardTokenRequest } from "../../../services/checkout/checkout.service";

export const CustomCreditCardInput = ({ name, onSuccess, onError }) => {
  const onChange = async (formData) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");
    const card = {
      number: values.number,
      exp_month:
        values.expiry.split("/").length > 0 ? values.expiry.split("/")[0] : "",
      exp_year:
        values.expiry.split("/").length > 1 ? values.expiry.split("/")[1] : "",
      cvc: values.cvc,
      name: name,
    };
    if (!isIncomplete) {
      try {
        const info = await cardTokenRequest(card);
        onSuccess(info);
      } catch (error) {
        onError();
      }
    }
  };
  return <CreditCardInput name={name} onChange={onChange} />;
};
