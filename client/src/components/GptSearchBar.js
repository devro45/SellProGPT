import React from "react";
import { useRef } from "react";
import openai from "../utils/openai";
import { useDispatch } from "react-redux";
import { addGptProductResult } from "../utils/gptSlice";
// import { OPENAI_KEY } from "../apiCalls/index";
const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const searchProductsAmazon = async (product) => {
    const data = await fetch(
      "https://api.rainforestapi.com/request?api_key=demo&type=search&amazon_domain=amazon.com&search_term=" +
        product
    );
    const json = await data.json();
    return json.search_results[0];
  };

  const handleGptSearchClick = async () => {
    const query =
      "Act asa Product Recommendation System and suggest some products for the query: " +
      searchText.current.value +
      ". only give me names of 5 products, comma seperated like the example result given ahead. Example Result for query Oneplus phones: Oneplus Nord ce2 lite , Oneplus nord 2T, Oneplus nord ce3 5g lite , Oneplus nord ce4, Oneplus 12R";
    const getResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "gpt-3.5-turbo",
    });

    console.log(getResults.choices[0]?.message?.content);

    const gptProducts = getResults.choices[0]?.message?.content.split(",");

    const data = gptProducts.map((product) => searchProductsAmazon(product));

    const amazonResults = await Promise.all(data);
    dispatch(
      addGptProductResult({
        productName: getProducts,
        ProductResult: gptamazonResults,
      })
    );
  };

  return (
    <div className="p-10 m-6 flex justify-center">
      <form className="" onSubmit={(e) => e.preventDefault()}>
        <input
          ref={searchText}
          type="text"
          className="p-3 m-4  rounded bg-white text-black"
          placeholder="What do you want to buy today?"
        />
        <button
          className="py-2 px-4 bg-red-700 rounded text-white"
          onClick={handleGptSearchClick}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
