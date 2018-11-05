import React from 'react';

const SaveToHomeScreen = ({ onSaveAppToHomeScreen }) => {
  return (
    <a
      className="btn-floating btn-large waves-effect waves-light d-flex align-items-center z-depth-3"
      style={{
        position: 'fixed',
        right: 15,
        bottom: 65
      }}
      onClick={e => {
        e.preventDefault();
        onSaveAppToHomeScreen();
      }}
    >
      <i className="icon icon-inbox-in" />
    </a>
  );
};

export default SaveToHomeScreen;
