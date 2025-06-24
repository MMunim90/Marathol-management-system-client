import React from 'react';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
const MainLayouts = () => {
    return (
        <div>
            <div className='sticky top-0 z-10'>
                <Navbar></Navbar>
            </div>
            <div className='w-11/12 mx-auto'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;