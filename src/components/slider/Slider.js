import React, { useState } from "react";
import { sliderData } from "./sliderData";

export default function Slider() {
  const [curSlide, setCurSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = () => {
    // if (curSlide < slideLength) {
    //   setTimeout(() => setCurSlide(curSlide + 1), 3500);
    // } else {
    //   setCurSlide(0);
    // }
  };
  autoScroll();

  return (
    <div className="slider">
      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={slide.id}
            className={`${
              curSlide === index ? "opacity-100" : "opacity-0"
            } relative transition-opacity delay-200 ease-in-out`}
          >
            {index === curSlide && (
              <div className="relative ">
                <img src={image} alt="slide" />
                <div className="absolute top-2/4 left-2/4 translate-50-50 bg-dim p-12 w-2/4 text-center">
                  <h2 className="text-white opacity-100 text-4xl tracking-wider mb-4 font-bold">
                    {heading}
                  </h2>
                  <p className="text-white opacity-100 text-base tracking-normal mb-2">
                    {desc}
                  </p>
                  <hr className="border border-white" />
                  <button className="text-white opacity-100 mt-2 bg-indigo-800 hover:bg-indigo-900 p-2 rounded text-sm">
                    Shop Now
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
