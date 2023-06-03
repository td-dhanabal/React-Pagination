import React from 'react';
import './index.scss';
import Logo from '../../assets/sct-logo.svg';

const Header = () => {
    return (
        <div className='header-body'>
            <img src={Logo} alt='' />
            React Pagination
        </div>
    );
}

export default Header;
