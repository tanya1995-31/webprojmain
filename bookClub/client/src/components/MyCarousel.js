import { React, useState } from "react";

const MyCarousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerSlide = 6; // Number of items you want to show per slide
    const maxIndex = Math.ceil(items.length / itemsPerSlide) - 1;
  
    const goToPrevious = () => {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
    };
  
    const goToNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
    };
  
    // Get the subset of items to show for the current slide
    const currentItems = items.slice(currentIndex * itemsPerSlide, (currentIndex + 1) * itemsPerSlide);
  
    return (
        <div className="my-carousel relative">
          <div className="flex overflow-hidden">
            {currentItems}
          </div>
          <div className="text-center mt-4">
            <button
                onClick={goToPrevious}
                className="btn inline-block mx-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300"
            >
                Previous
            </button>
            <button
                onClick={goToNext}
                className="btn inline-block mx-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300"
            >
                Next
            </button>
          </div>
        </div>
      );    
  };

  export default MyCarousel;