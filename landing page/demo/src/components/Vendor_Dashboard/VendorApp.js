
import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Profile from './Profile';
import Requests from './Requests';
import Quotations from './Quotations';
import Orders from './Orders';
import LogoutButton from './LogoutButton';
import SendQuoteForm from './SendQuoteForm';
import './VendorApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const VendorApp = () => {
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/vendor-dashboard') {
            navigate('/vendor-dashboard/profile');
        }
    }, [navigate, location.pathname]);

    const handleLogout = () => {
        console.log('token');
        localStorage.clear();
        navigate('/', { replace: true });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar className="custom-navbar" expand="lg">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand className="custom-brand" href="#home">Vendor Dashboard</Navbar.Brand>
                    <Nav>
                        <LogoutButton onLogout={handleLogout} />
                    </Nav>
                </Container>
            </Navbar>
            <Container fluid className="d-flex flex-grow-1">
                <div className="custom-sidebar text-white p-3" style={{ width: '200px' }}>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/vendor-dashboard/profile" className="custom-nav-link">Profile</Nav.Link>
                        <Nav.Link as={Link} to="/vendor-dashboard/requests" className="custom-nav-link">Requests</Nav.Link>
                        <Nav.Link as={Link} to="/vendor-dashboard/quotations" className="custom-nav-link">Quotations</Nav.Link>
                        <Nav.Link as={Link} to="/vendor-dashboard/orders" className="custom-nav-link">Orders</Nav.Link>
                    </Nav>
                </div>
                <div className="flex-grow-1 p-4">
                    <Routes>
                        <Route path="profile" element={<Profile />} />
                        <Route path="requests" element={<Requests />} />
                        <Route path="quotations" element={<Quotations />} />
                        <Route path="orders" element={<Orders  />} />
                        <Route path="send-quote-form/requestId" element={<SendQuoteForm />} />
                    </Routes>
                </div>
            </Container>
        </div>
    );
};

export default VendorApp;
