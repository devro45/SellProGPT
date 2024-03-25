const ProductCard = (props) => {
  const { ProductData } = props;
  <div className="m-4 p-4 w-[200px] h-[300px] ">
    <img
      className="h-[100px] w-[160px] p-1 rounded-lg"
      alt="product-logo"
      src={ProductData.image}
    />
    <h3 className="font-bold py-4 text-lg">{ProductData.title}</h3>

    <h3>{ProductData.availability.raw} </h3>
    <h3>{ProductData.prices.raw}</h3>
  </div>;
};
export default ProductCard;

// "position": 1,
//       "title": "Sony 240GB SxS PRO X Memory Card, 1250MB/s Read, 600MB/s Write",
//       "asin": "B08KW4ZNHF",
//       "link": "https://www.amazon.com/Sony-SBP240F-Memory-1250MB-s44-600MB-s/dp/B08KW4ZNHF/ref=sr_1_1?dib=eyJ2IjoiMSJ9.9zWY7LnI-Lk4YGlL7Dv5EL4tumUa9opUk5kuZXo5juTvm1TFEB9EkVhHxEykGs3EZwh4ty_Z5e9QY-i6FJt-EH3SistB3vIHTrt_cIkU0pC0LcR7gZXTU4eJBtiEh9oZJrteP3126O0oxVxeznRR81nrajzXO5oHPR_KPeQHEgapHhsLfa2pr_LXpUH2n_Ye4-7jsBPIJhiiXXpwtFs7WCcjCeVnmbY7gPO1yux3eBw.JPg0Z-4EyzmLkrkSzONR02TgxurAdUvmbGRIwqHtJXE&dib_tag=se&keywords=memory+cards&qid=1711295846&sr=8-1",
//       "availability": {
//         "raw": "Only 2 left in stock - order soon."
//       },
//       "categories": [
//         {
//           "name": "All Departments",
//           "id": "aps"
//         }
//       ],
//       "image": "https://m.media-amazon.com/images/I/61oe2VU8wDL._AC_UY218_.jpg",
//       "prices": [
//         {
//           "symbol": "$",
//           "value": 1599.95,
//           "currency": "USD",
//           "raw": "$1,599.95",
//           "asin": "B08KW4ZNHF",
//           "link": "https://www.amazon.com/Sony-SBP240F-Memory-1250MB-s44-600MB-s/dp/B08KW4ZNHF/ref=sr_1_1?dib=eyJ2IjoiMSJ9.9zWY7LnI-Lk4YGlL7Dv5EL4tumUa9opUk5kuZXo5juTvm1TFEB9EkVhHxEykGs3EZwh4ty_Z5e9QY-i6FJt-EH3SistB3vIHTrt_cIkU0pC0LcR7gZXTU4eJBtiEh9oZJrteP3126O0oxVxeznRR81nrajzXO5oHPR_KPeQHEgapHhsLfa2pr_LXpUH2n_Ye4-7jsBPIJhiiXXpwtFs7WCcjCeVnmbY7gPO1yux3eBw.JPg0Z-4EyzmLkrkSzONR02TgxurAdUvmbGRIwqHtJXE&dib_tag=se&keywords=memory+cards&qid=1711295846&sr=8-1"
//         }
