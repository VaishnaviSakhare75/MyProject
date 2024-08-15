import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RequestForm = () => {
    const [formData, setFormData] = useState({
        propertyType: '',
        address: '',
        electricityBill: '',
        electricityConsumption: ''
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};
        
        if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.electricityBill || isNaN(formData.electricityBill)) newErrors.electricityBill = 'Valid electricity bill amount is required';
        if (!formData.electricityConsumption || isNaN(formData.electricityConsumption)) newErrors.electricityConsumption = 'Valid electricity consumption is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const errors = validate(); // Ensure this function is defined correctly
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            try {
                const response = await axios.post('http://13.60.185.52:8080/customer/submitrequest', {
                    propertyType: formData.propertyType,
                    address: formData.address,
                    electricityBill: parseFloat(formData.electricityBill), // Ensure this is a number
                    electricityConsumption: parseFloat(formData.electricityConsumption) // Ensure this is a number
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
    
                setSuccess('Request added successfully!');
                navigate('/customer-dashboard/requests'); // Redirect after successful submission
            } catch (error) {
                console.error("There was an error submitting the form!", error);
                // Handle error response
            }
        }
    };
    

    return (
        <div className="container-xl px-4 mt-4">
            <div className="card border-primary">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Request Form</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {success && <div className="alert alert-success">{success}</div>}
                        {errors.server && <div className="alert alert-danger">{errors.server}</div>}
                        
                        <div className="mb-3">
                            <label htmlFor="propertyType" className="form-label">Property Type</label>
                            <input 
                                type="text" 
                                id="propertyType" 
                                name="propertyType" 
                                className={`form-control ${errors.propertyType ? 'is-invalid' : ''}`} 
                                value={formData.propertyType}
                                onChange={handleChange} 
                                required 
                            />
                            {errors.propertyType && <div className="invalid-feedback">{errors.propertyType}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input 
                                type="text" 
                                id="address" 
                                name="address" 
                                className={`form-control ${errors.address ? 'is-invalid' : ''}`} 
                                value={formData.address}
                                onChange={handleChange} 
                                required 
                            />
                            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="electricityBill" className="form-label">Electricity Bill</label>
                            <input 
                                type="text" 
                                id="electricityBill" 
                                name="electricityBill" 
                                className={`form-control ${errors.electricityBill ? 'is-invalid' : ''}`} 
                                value={formData.electricityBill}
                                onChange={handleChange} 
                                required 
                            />
                            {errors.electricityBill && <div className="invalid-feedback">{errors.electricityBill}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="electricityConsumption" className="form-label">Electricity Consumption</label>
                            <input 
                                type="text" 
                                id="electricityConsumption" 
                                name="electricityConsumption" 
                                className={`form-control ${errors.electricityConsumption ? 'is-invalid' : ''}`} 
                                value={formData.electricityConsumption}
                                onChange={handleChange} 
                                required 
                            />
                            {errors.electricityConsumption && <div className="invalid-feedback">{errors.electricityConsumption}</div>}
                        </div>
                        <div className="d-flex justify-content-between">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={() => window.history.back()} // Navigate back to the previous page
                            >
                                Back
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RequestForm;
