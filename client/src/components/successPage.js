import React from 'react';

const SuccessPage = ({ token }) => {
  return (
    <div>
      <h2>Login Successful</h2>
      <p>Welcome! Your token is: {token}</p>
    </div>
  );
};

export default SuccessPage;
