import { PlatformPay, PlatformPayButton, confirmPlatformPayPayment, isPlatformPaySupported } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

function PaymentScreen() {
  const [isApplePaySupported, setIsApplePaySupported] = useState(false);

  useEffect(() => {
    (async function () {
      setIsApplePaySupported(await isPlatformPaySupported());
    })();
  }, [isPlatformPaySupported]);

    // ...
    const fetchPaymentIntentClientSecret = async () => {
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          some: 'value',
        }),
      });
      const { clientSecret } = await response.json();
  
      return clientSecret;
    };
        // ...
    const pay = async () => {
        const clientSecret = await fetchPaymentIntentClientSecret()
        const { error } = await confirmPlatformPayPayment(
        clientSecret,
        {
            applePay: {
            cartItems: [
                {
                label: 'Example item name',
                amount: '14.00',
                paymentType: PlatformPay.PaymentType.Immediate,
                },
                {
                label: 'Total',
                amount: '12.75',
                paymentType: PlatformPay.PaymentType.Immediate,
                },
            ],
            merchantCountryCode: 'US',
            currencyCode: 'USD',
            requiredShippingAddressFields: [
                PlatformPay.ContactField.PostalAddress,
            ],
            requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
            },
        }
        );
        if (error) {
        // handle error
        } else {
        Alert.alert('Success', 'Check the logs for payment intent details.');
        }
    };

  // ...

  return (
    <View>
      {isApplePaySupported && (
        <PlatformPayButton
          onPress={pay}
          type={PlatformPay.ButtonType.Order}
          appearance={PlatformPay.ButtonStyle.Black}
          borderRadius={4}
          style={{
            width: '100%',
            height: 50,
          }}
        />
      )}
    </View>
  );
}

export default PaymentScreen