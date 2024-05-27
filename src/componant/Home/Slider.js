import React from 'react';
import prev1 from '../../Assets/img/1.webp'
import prev2 from '../../Assets/img/2.webp'
import prev3 from '../../Assets/img/3.webp'
import prev4 from '../../Assets/img/4.webp'
import prev5 from '../../Assets/img/5.webp'
import prev6 from '../../Assets/img/6.webp'
import prev7 from '../../Assets/img/7.webp'
import { useState, useEffect } from 'react';
const Slider = () => {

  const [divCount, setDivCount] = useState(0); // State to keep track of the number of divs


  // Function to add a new div after every 60 seconds (1000 ms * 60)
  const addDivAutomatically = () => {
    setDivCount(divCount + 1);
  };

  useEffect(() => {
    // Set interval to add a new div every 60 seconds
    const intervalId = setInterval(addDivAutomatically, 1000);

    // Clean up function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, [divCount]); // Run effect when divCount changes

  return (
    <div className='containerSlider'>
      <div className='containerSlider-inner'>
        <div className='img-slider' >
        <div className='img-box'>
                <img src={prev1} alt="" />
                <img src={prev2} alt="" />
                <img src={prev3} alt="" />
                <img src={prev4} alt="" />
                <img src={prev5} alt="" />
                <img src={prev6} alt="" />
                <img src={prev7} alt="" />
              </div>
          {[...Array(divCount)].map((_, index) => (
            <div key={index} className="appended-div">
              <div className='img-box'>
                <img src={prev1} alt="" />
                <img src={prev2} alt="" />
                <img src={prev3} alt="" />
                <img src={prev4} alt="" />
                <img src={prev5} alt="" />
                <img src={prev6} alt="" />
                <img src={prev7} alt="" />
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Slider;