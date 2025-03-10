import Iyzipay from 'iyzipay';

// Iyzipay yapılandırması
const iyzipay = new Iyzipay({
  apiKey: import.meta.env.VITE_IYZICO_API_KEY || '',
  secretKey: import.meta.env.VITE_IYZICO_SECRET_KEY || '',
  uri: import.meta.env.VITE_IYZICO_URI || 'https://sandbox-api.iyzipay.com'
});

interface PaymentRequest {
  userId: string;
  email: string;
  name: string;
  amount: number;
  cardNumber: string;
  expireMonth: string;
  expireYear: string;
  cvc: string;
}

export async function createPayment({
  userId,
  email,
  name,
  amount,
  cardNumber,
  expireMonth,
  expireYear,
  cvc
}: PaymentRequest) {
  try {
    const request = {
      locale: 'tr',
      conversationId: userId,
      price: amount.toString(),
      paidPrice: amount.toString(),
      currency: 'TRY',
      installment: '1',
      basketId: 'PREMIUM_' + userId,
      paymentChannel: 'WEB',
      paymentGroup: 'PRODUCT',
      paymentCard: {
        cardHolderName: name,
        cardNumber,
        expireMonth,
        expireYear,
        cvc,
        registerCard: '0'
      },
      buyer: {
        id: userId,
        name: name.split(' ')[0] || '',
        surname: name.split(' ')[1] || '',
        email: email,
        identityNumber: '11111111111',
        registrationAddress: 'Test Adresi',
        city: 'Istanbul',
        country: 'Turkey',
        ip: '85.34.78.112'
      },
      shippingAddress: {
        contactName: name,
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Test Adresi'
      },
      billingAddress: {
        contactName: name,
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Test Adresi'
      },
      basketItems: [
        {
          id: 'PREMIUM_SUBSCRIPTION',
          name: 'Premium Üyelik',
          category1: 'Üyelik',
          itemType: 'VIRTUAL',
          price: amount.toString()
        }
      ]
    };

    return new Promise((resolve, reject) => {
      iyzipay.payment.create(request, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    throw error;
  }
}
