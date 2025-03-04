import React from "react";
import { Product } from "../../types/types";
import "./Specifications.css";

interface Specification {
  label: string;
  value: string | number | undefined;
}

interface SpecificationsProps {
  product: Product | null;
}

const Specifications: React.FC<SpecificationsProps> = ({ product }) => {
  const specifications: Specification[] = [
    { label: "BRAND", value: product?.brand },
    { label: "NAME", value: product?.name },
    { label: "DESCRIPTION", value: product?.description },
    ...Object.entries(product?.specs || {}).map(([key, value]) => ({
      label: key.toUpperCase(),
      value:
        typeof value === "string" || typeof value === "number"
          ? value
          : undefined,
    })),
  ];

  return (
    <>
      <h2 className="specifications__title">Specifications</h2>
      <div className="spec-grid">
        {specifications.map(({ label, value }) => (
          <div className="spec-row" key={label}>
            <div className="spec-label">{label}</div>
            <div className="spec-value">{value || "N/A"}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Specifications;
