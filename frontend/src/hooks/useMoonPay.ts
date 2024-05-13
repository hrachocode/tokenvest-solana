import { loadMoonPay } from "@moonpay/moonpay-js";
export const useMoonPay = () => {
  const initialize = async () => {
    const moonPay = await loadMoonPay();
    if (moonPay) {
      const moonPaySdk = moonPay({
        flow: "buy",
        environment: "sandbox",
        variant: "overlay",
        params: {
          apiKey: "pk_test_4C3XX0JxCd2wEknrpkt96uL6W7Rygt",
          theme: "dark",
          baseCurrencyCode: "usd",
          baseCurrencyAmount: "100",
          defaultCurrencyCode: "eth",
        },
      });
      if (moonPaySdk) {
        moonPaySdk.show();
      }
    }
  };

  return { initialize };
};
