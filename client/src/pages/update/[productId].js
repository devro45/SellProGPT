import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { isAuthenticated } from "../../apiCalls/auth";
import { getProduct, updateProduct } from "../../apiCalls/products";
import toast from "react-hot-toast";

const UpdatePage = () => {
  const history = useHistory();
  const { user, token } = isAuthenticated();
  const { productId } = useParams();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    photo: "",
    category: "",
    loading: false,
  });

  const { name, description, price, category, loading } = values;

  const loadProduct = () => {
    getProduct(productId).then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    formData.set("price", price);
    formData.set("category", category);
    formData.set("photo", values.photo);

    setValues({ ...values, loading: true });
    updateProduct(productId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, loading: false });
        toast.error(data.error);
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          loading: false,
        });
        toast.success(`${data.name} updated successfully`);
        history.push("/myproducts");
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (!isAuthenticated()) history.push("/myproducts");
    loadProduct();
  }, []);

  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full p-8 bg-gray-900 rounded-lg"
      >
        <h2 className="text-white text-3xl mb-8">
          Update details of your product
        </h2>
        <input
          type="text"
          value={name}
          onChange={handleChange("name")}
          className="w-full bg-gray-800 text-white p-2 rounded-lg mb-4"
          placeholder="Enter new name"
          required
        />
        <textarea
          value={description}
          onChange={handleChange("description")}
          className="w-full bg-gray-800 text-white p-2 rounded-lg mb-4"
          placeholder="Enter new description"
          required
        />
        <input
          type="file"
          onChange={handleChange("photo")}
          className="w-full bg-gray-800 text-white p-2 rounded-lg mb-4"
          accept="image/*"
        />
        <input
          type="number"
          value={price}
          onChange={handleChange("price")}
          className="w-full bg-gray-800 text-white p-2 rounded-lg mb-4"
          placeholder="Enter new price (INR)"
          required
        />
        <select
          value={category}
          onChange={handleChange("category")}
          className="w-full bg-gray-800 text-white p-2 rounded-lg mb-4"
        >
          <option value="" disabled>
            Select Category
          </option>
          {/* Render categories */}
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-400"
          disabled={loading}
        >
          {loading ? "Updating product..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePage;
