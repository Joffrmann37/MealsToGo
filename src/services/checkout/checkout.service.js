import createStripe from "stripe-client";
import { host } from "../../utils/env";

const stripe = createStripe(
  "pk_test_51JpOGDHKLoFo0NGzoyANGRcoyEsma7P7JCpErq3zNPNCSYRYvvmWwYk4osBE2dM77Mv9MH0cW7MQ4LxwIbmbYy6C00SWwCdV5g"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = (token, amount, name) => {
  return fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: "POST",
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("Something went wrong processing your payment");
    }
    return res.json();
  });
};
