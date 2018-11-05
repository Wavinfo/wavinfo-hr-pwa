import React from 'react';

const Navbar = ({ onLinkTo, currentPath }) => {
  return (
    <div className="block-navbar">
      <nav>
        <a
          href="#"
          className="align-items-center left h-100"
          style={{
            marginLeft: '1rem',
            display: currentPath === 'messages' ? 'none' : 'flex'
          }}
          onClick={e => {
            e.preventDefault();
            onLinkTo('messages');
          }}
        >
          <i className="icon icon-chevron-left" />
        </a>

        <a
          className="brand-logo"
          target="_blank"
          rel="noopener noreferrer"
          href="https://femascloud.com/wavinfo/accounts/login"
        >
          Wavbo
        </a>

        <a
          href="#"
          className="d-flex align-items-center right h-100"
          style={{
            marginRight: '1rem',
            display: currentPath === 'setting' ? 'none' : 'flex'
          }}
          onClick={e => {
            e.preventDefault();
            onLinkTo('setting');
          }}
        >
          <i className="icon icon-setting" />
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
