import React from 'react';

const Header = ({ header }) => {
    return (
      <div className="text-white py-4 px-8 flex justify-between items-center">
      <div className="flex-grow text-center">
          {/* Increase text size using Tailwind text size classes */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">{header}</h1>
      </div>
  </div>
      );
};

export default Header;
