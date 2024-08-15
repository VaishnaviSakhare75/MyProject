import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './registrationForm.css'; 

function CustomerRegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!firstName) errors.firstName = 'First name is required';
    if (!lastName) errors.lastName = 'Last name is required';
    if (!mobile) errors.mobile = 'Mobile number is required';
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (!city) errors.city = 'City is required';
    if (!pincode) errors.pincode = 'Pincode is required';
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        const response = await axios.post('https://13.60.185.52:8080/csubmit', {
          firstName,
          lastName,
          mobile,
          email,
          city,
          pincode,
          password
        });
        setSuccess('Registration Successful !!');
        
        navigate('/loginform'); // Redirect after successful submission
        console.log(response.data); // Handle success response
      } catch (error) {
        console.error("There was an error submitting the form!", error);
        // Handle error response
      }
    }
  };
  
  return (
    <section className="gradient-custom">
      <div className="container py-5 h-150 ">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Customer Registration Form</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          className="form-control form-control-lg"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label className="form-label" htmlFor="firstName">First Name</label>
                        {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="lastName"
                          className="form-control form-control-lg"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        <label className="form-label" htmlFor="lastName">Last Name</label>
                        {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="tel"
                          id="mobile"
                          className="form-control form-control-lg"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                        <label className="form-label" htmlFor="mobile">Mobile</label>
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
                          id="city"
                          className="form-control form-control-lg"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                        <label className="form-label" htmlFor="city">City</label>
                        {errors.city && <div style={{ color: 'red' }}>{errors.city}</div>}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="pincode"
                          className="form-control form-control-lg"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                        />
                        <label className="form-label" htmlFor="pincode">Pincode</label>
                        {errors.pincode && <div style={{ color: 'red' }}>{errors.pincode}</div>}
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
                    <input
                      data-mdb-ripple-init
                      className="btn btn-primary btn-lg"
                      type="submit"
                      value="Submit"
                    />
                    {success && <div style={{ color: 'green' }}>{success}</div>}
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

export default CustomerRegistrationForm;
