import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: 20 })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
            .catch(err => {
                console.error("Error creating payment intent", err);
            });
    }, [axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error: paymentMethodError } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (paymentMethodError) {
            setError(paymentMethodError.message);
            return;
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            setError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            const payment = {
                email: user?.email,
                price: 20,
                transactionId: paymentIntent.id,
                date: new Date(),
            };

            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data)
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: `${user?.displayName} Thank you for your payment`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/');
                })
                .catch(err => {
                    console.error('Payment saving error:', err);
                    toast.error(err.message);
                });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 md:mt-20 lg:mt-28 bg-white p-8 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Complete Your Payment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                        className="p-3 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Pay
                </button>
                {error && <p className="mt-4 text-red-500">{error}</p>}
                {transactionId && <p className="mt-4 text-green-500">Your Transaction ID: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckOutForm;
