// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Requests.css';
// import { useNavigate, useLocation } from 'react-router-dom';
// import SendQuoteForm from './SendQuoteForm';

// const Requests = () => {
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchRequests = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     throw new Error('No token found, please log in again.');
//                 }

//                 const response = await axios.get('http://localhost:8282/vendor/getrequests', {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });

//                 setRequests(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching requests:', error);
//                 setError('Error fetching requests.');
//                 setLoading(false);
//             }
//         };

//         fetchRequests();
//     }, []);

//     const handleSendQuote = (request) => {
//         console.log('Send quote for:', request);
//         navigate('/SendQuoteForm ');
//         // You can add the logic to handle sending a quote here.
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     const columns = [
//         'Name', 'Email', 'Mobile', 'Property Type', 'Address', 'Electricity Bill', 'Electricity Consumption', 'Actions'
//     ];

//     return (
//         <div className="requests">
//             <h2>Requests</h2>
//             <table className="table table-bordered">
//                 <thead>
//                     <tr>
//                         {columns.map((col, index) => (
//                             <th key={index}>{col}</th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {requests.map((request, index) => (
//                         <tr key={index}>
//                             <td>{request.customer.firstName} {request.customer.lastName}</td>
//                             <td>{request.customer.email}</td>
//                             <td>{request.customer.mobile}</td>
//                             <td>{request.propertyType}</td>
//                             <td>{request.address}</td>
//                             <td>{request.electricityBill}</td>
//                             <td>{request.electricityConsumption}</td>
//                             <td>
//                                 <button onClick={() => handleSendQuote(request)}>Send Quote</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Requests;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Requests.css';
import { useNavigate } from 'react-router-dom';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, please log in again.');
                }

                const response = await axios.get('http://13.60.185.52:8080/vendor/getrequests', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setRequests(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching requests:', error);
                setError('Error fetching requests.');
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleSendQuote = (requestId) => {
        console.log({requestId});
        navigate(`/send-quote-form/${requestId}`); // Navigate to SendQuoteForm with requestId
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const columns = [
        'Name', 'Email', 'Mobile', 'Property Type', 'Address', 'Electricity Bill', 'Electricity Consumption', 'Actions'
    ];

    return (
        <div className="requests">
            <h2>Requests</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.customer.firstName} {request.customer.lastName}</td>
                            <td>{request.customer.email}</td>
                            <td>{request.customer.mobile}</td>
                            <td>{request.propertyType}</td>
                            <td>{request.address}</td>
                            <td>{request.electricityBill}</td>
                            <td>{request.electricityConsumption}</td>
                            <td>
                                <button onClick={() => handleSendQuote(request.rId)}>Send Quote</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Requests;
