import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, please log in again.');
                }

                const response = await axios.get('http://localhost:8282/customer/getorders', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setMessage('Error fetching orders.');
            }
        };

        fetchOrders();
    }, []);

    const handleCompletePayment = async (oid) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found, please log in again.');
            }

            // Send request to update order status
            await axios.get(`http://localhost:8282/customer/completepayment/${Number(oid)}`, 
            
             {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            

            // Update order status locally
            // setOrders(orders.map(order =>
            //     order.oId === oid ? { ...order, orderStatus: 'Completed', paymentStatus: 'Paid' } : order
            // ));
            setMessage('Order status updated successfully.');
        } catch (error) {
            console.error('Error updating order status:', error);
            setMessage('Error updating order status.');
        }
    };

    return (
        <div className="container-xl px-4 mt-4">
            <div className="card mb-4">
                <div className="card-body">
                    <h2>Orders</h2>
                    {message && (
                        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} alert-dismissible`} role="alert">
                            {message}
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => setMessage('')}></button>
                        </div>
                    )}
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Quotation ID</th>
                                <th>Customer Name</th>
                                <th>Vendor Name</th>
                                <th>Company</th>
                                <th>Site Address</th>
                                <th>Amount</th>
                                <th>Order Status</th>
                                <th>Payment Status</th>
                                <th>Order Date</th>
                                <th>Action</th> {/* New column for actions */}
                            </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order.oId}>
                                <td>{order.quotation.qId}</td><td>{order.customer.firstName} {order.customer.lastName}</td>
                                <td>{order.vendor.fName} {order.vendor.lName}</td>
                                <td>{order.quotation.vendor.company}</td>
                                <td>{order.quotation.vendor.address}</td>
                                <td>{order.quotation.price}</td>
                                <td>{order.orderStatus}</td>
                                <td>{order.paymentStatus}</td>
                                <td>{order.orderDate}</td>
                                <td>
    {(order.paymentStatus === 'Pending' || (order.paymentStatus === 'Requested')) && (
        <button
            className="btn btn-primary"
            onClick={() => handleCompletePayment(order.oId)}
        >
            Complete Payment
        </button>
    )}
</td>

                             </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
