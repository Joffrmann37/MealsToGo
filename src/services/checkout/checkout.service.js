import createStripe from "stripe-client";

const stripe = createStripe(
  "pk_test_51JpOGDHKLoFo0NGzoyANGRcoyEsma7P7JCpErq3zNPNCSYRYvvmWwYk4osBE2dM77Mv9MH0cW7MQ4LxwIbmbYy6C00SWwCdV5g"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });
