import GooglePayButton from "@google-pay/button-react";
import { useState } from "react";

export function GPayTest() {
  const [debugText, setDebugText] = useState<any>();
  const [statusText, setStatusText] = useState<string>("👍🏼 Pronto");

  return (
    <div className="flex flex-col items-center mx-auto mt-10 p-4 max-w-sm sm:flex sm:max-w-none sm:justify-center border-2 border-purple-500 rounded-md">
      <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-purple-500">
        Demo Google Pay FROD
      </h1>
      <p className="mb-3">Il tuo conto è di 49,69 €</p>
      <GooglePayButton
        buttonLocale="it"
        buttonType="checkout"
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "12345678901234567890",
            merchantName: "J&F&M",
          },
          offerInfo: {
            offers: [
              {
                redemptionCode: "PROMOTIONALCODE",
                description: "An excellent discount",
              },
            ],
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Totale ordine",
            totalPrice: "49.69",
            currencyCode: "EUR",
            countryCode: "IT",
            transactionId: "1234567890",
            checkoutOption: "COMPLETE_IMMEDIATE_PURCHASE",
          },
        }}
        onCancel={(reason) => {
          console.log("cancel", reason);
          setStatusText("❌ Annullato");
          setDebugText(reason);
        }}
        onClick={(event) => {
          console.log("click");
          setStatusText("🏁 Cliccato");
          setDebugText(event);
        }}
        onError={(error) => {
          console.log("error", error);
          setStatusText("🛑 Errore");
          setDebugText(error);
        }}
        onLoadPaymentData={(paymentRequest) => {
          console.log("load payment data", paymentRequest);
          setStatusText("✅ Pagamento inviato");
          setDebugText(paymentRequest);
        }}
      />
      <p className="my-3">{statusText}</p>
      <pre>{JSON.stringify(debugText, null, 2)}</pre>
    </div>
  );
}
