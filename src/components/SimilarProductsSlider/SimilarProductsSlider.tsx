import React, { useRef, useState, useEffect } from "react";
import PhoneCard from "../PhoneCard/PhoneCard";
import { Product } from "../../types/types";
import "./Slider.css";

interface SwipeableProductsSliderProps {
  products: Product[];
}

const SwipeableProductsSlider: React.FC<SwipeableProductsSliderProps> = ({
  products,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progressValue = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setProgress(progressValue);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div style={{ position: "relative" }}>
        <div ref={containerRef} className="similar-slider">
          {products.map((product, index) => (
            <div key={`${product.id}-${index}`} style={{ flex: "0 0 auto" }}>
              <PhoneCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          marginTop: "15px",
          height: "1px",
          width: "100%",
          background: "#CCCCCC",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "#000000",
            transition: "width 0.2s ease",
          }}
        />
      </div>
    </>
  );
};

export default SwipeableProductsSlider;
