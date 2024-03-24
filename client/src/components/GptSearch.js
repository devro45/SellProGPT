import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptProductsSuggestions from "./GptProductsSuggestions";

const GptSearch = () => {
  return (
    <div>
      <GptSearchBar />
      <GptProductsSuggestions />
    </div>
  );
};

export default GptSearch;
