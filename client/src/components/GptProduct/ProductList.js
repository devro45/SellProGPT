import ProductCard from "./ProductCard";

const ProductList = ({ name, products }) => {
  <div className="px-6">
    <h1 className="text-3xl py-4 text-white">{title}</h1>
    <div className="flex overflow-scroll">
      <div className="flex">
        {products.map((product) => {
          <ProductCard
            key={product.asin}
            image={product.image}
            availability={product.availability}
            prices={product.prices}
            title={name}
          />;
        })}
      </div>
    </div>
  </div>;
};
export default ProductList;
