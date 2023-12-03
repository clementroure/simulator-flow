// components/CheckoutButton.tsx
import React from 'react';
import { useStripe } from '@stripe/react-stripe-js';

const CheckoutButton: React.FC = () => {
  const stripe = useStripe();

  const redirectToCheckout = async () => {
    const response = await fetch('/api/stripe/checkout_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const { sessionId } = await response.json();
      const result = await stripe!.redirectToCheckout({ sessionId });

      if (result.error) {
        alert(result.error.message);
      }
    } else {
      alert('Failed to create checkout session');
    }
  };

  return <button onClick={redirectToCheckout}>Subscribe Now</button>;
};

export default CheckoutButton;
