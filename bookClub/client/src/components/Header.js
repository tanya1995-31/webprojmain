import React from 'react';

const Header = ({ header }) => {
    return (
        <div className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
          <div className="flex-grow text-center">
            <span className="text-xl font-semibold"><h1>{header}</h1></span>
          </div>
          <br />
        </div>
      );
};

export default Header;
