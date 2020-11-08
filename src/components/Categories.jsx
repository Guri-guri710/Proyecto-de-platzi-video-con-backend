import React from 'react';

const categories = ({ children }) => (
  <div className="Categories">
    <h3 className="categories__title">{title}</h3>
    {children}
  </div>
);

export default categories;