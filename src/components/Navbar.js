import React from 'react';
import { connect } from 'react-redux';
import { linkTo } from './../actions';

const Navbar = ({ linkTo, currentPath }) => {
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
            linkTo('messages');
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
          className="d-soft-flex align-items-center right h-100"
          style={{
            marginRight: '1rem',
            display: currentPath === 'setting' ? 'none' : 'flex'
          }}
          onClick={e => {
            e.preventDefault();
            linkTo('setting');
          }}
        >
          <i className="icon icon-setting" />
        </a>
      </nav>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentPath: state.currentPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    linkTo: path => dispatch(linkTo(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
