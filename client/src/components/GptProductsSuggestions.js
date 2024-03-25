import React from "react";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";
import ProductList from "./GptProduct/ProductList";

const GptProductsSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { ProductResults, productName } = gpt;
  if (!ProductResults) return <Shimmer />;
  return (
    <div>
      {ProductResults.map((productName, index) => (
        <ProductList
          key={productName}
          name={productName}
          products={ProductResults[index]}
        />
      ))}
    </div>
  );
};

export default GptProductsSuggestions;
