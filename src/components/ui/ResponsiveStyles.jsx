import React from 'react';

const ResponsiveStyles = (WrappedComponent) => {
  return (props) => {
    return (
      <div className="container h-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default ResponsiveStyles;
