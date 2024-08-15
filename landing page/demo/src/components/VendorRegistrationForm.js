import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './registrationForm.css'; // Custom CSS file if needed
import { useNavigate } from 'react-router';

function VendorRegistrationForm() {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!fName) errors.fName = 'First name is required';
    if (!lName) errors.lName = 'Last name is required';
    if (!mobile) errors.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(mobile)) errors.mobile = 'Invalid mobile number';
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email address';
    if (!company) errors.company = 'Company name is required';
    if (!address) errors.address = 'Address is required';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 8) errors.password = 'Password must be at least 8 characters long';
    if (!confirmPassword) errors.confirmPassword = 'Confirm password is required';
    else if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match';
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        // Handle form submission (e.g., send data to server)
        const response = await axios.post('https://13.60.185.52:8080/vsubmit', {
          fName,
          lName,
          mobile,
          email,
          company,
          address,
          password,
        });
        
        setSuccess('Registration Successful');
        navigate('/loginform'); 
        console.log('Vendor registered:', response.data);
      } catch (error) {
        console.error('There was an error registering the vendor!', error);
      }
    }
  };

  return (
    <section className="gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Vendor Registration Form</h3>
                <form onSubmit={handleSubmit}>
                  {/* Form Fields */}
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="fName"
                          className="form-control form-control-lg"
                          value={fName}
                          onChange={(e) => setFName(e.target.value)}
                        />
                        <label className="form-label" htmlFor="fName">First Name</label>
                        {errors.fName && <div style={{ color: 'red' }}>{errors.fName}</div>}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="lName"
                          className="form-control form-control-lg"
                          value={lName}
                          onChange={(e) => setLName(e.target.value)}
                        />
                        <label className="form-label" htmlFor="lName">Last Name</label>
                        {errors.lName && <div style={{ color: 'red' }}>{errors.lName}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="mobile"
                          className="form-control form-control-lg"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                        <label className="form-label" htmlFor="mobile">Mobile Number</label>
                        {errors.mobile && <div style={{ color: 'red' }}>{errors.mobile}</div>}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="form-label" htmlFor="email">Email</label>
                        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="company"
                          className="form-control form-control-lg"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                        <label className="form-label" htmlFor="company">Company</label>
                        {errors.company && <div style={{ color: 'red' }}>{errors.company}</div>}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="address"
                          className="form-control form-control-lg"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <label className="form-label" htmlFor="address">Address</label>
                        {errors.address && <div style={{ color: 'red' }}>{errors.address}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="password">Password</label>
                        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="confirmPassword"
                          className="form-control form-control-lg"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                        {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                   {success && <div style={{ color: 'green', marginTop: '20px' }}>Registration successful!</div>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VendorRegistrationForm;
