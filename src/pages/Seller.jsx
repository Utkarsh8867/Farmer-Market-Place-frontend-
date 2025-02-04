



// import { useState, useEffect } from "react";

// export default function SellerDashboard() {
//   const [orders, setOrders] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [featuredProducts, setFeaturedProducts] = useState([]);  // Add featuredProducts state
//   const [activeTab, setActiveTab] = useState("orders");
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     description: "",
//     category: "",
//     tags: "",
//     isFeatured: false,
//     originalPrice: "",
//     discountPrice: "",
//     stock: "",
//     image: "",
//   });

//   // Replace with dynamic userId and shopId retrieval logic
//   const userId = localStorage.getItem("userId") || "USER_ID_HERE";
//   const shopId = localStorage.getItem("shopId") || "67914202230954caf891b880";

//   useEffect(() => {
//     fetchOrders();
//     fetchProducts();
//     fetchFeaturedProducts();  // Fetch featured products as well
//   }, []);

//   // Fetch orders for the seller
//   const fetchOrders = async () => {
//     try {
//       const shopIdFromLocalStorage = shopId; // Assuming this is fetched from localStorage
  
//       // Fetch all orders for the seller from the API
//       const res = await fetch(`http://localhost:8000/api/v2/order/get-seller-all-orders/${shopIdFromLocalStorage}`);
//       if (!res.ok) throw new Error("Failed to fetch orders");
  
//       const data = await res.json();
  
//       // Check if the response is successful and contains orders
//       if (!data.success || !data.orders) {
//         throw new Error("Invalid data format or no orders found");
//       }
  
//       // Set the fetched orders directly to the state
//       setOrders(data.orders);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       alert("Failed to load orders. Please try again.");
//     }
//   };

//   // Fetch all products for the seller
//   const fetchProducts = async () => {
//     try {
//       const res = await fetch(`http://localhost:8000/api/v2/product/get-all-products-shop/${shopId}`);
//       if (!res.ok) throw new Error("Failed to fetch products");
//       const data = await res.json();
//       setProducts(data.products || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       alert("Failed to load products. Please try again.");
//     }
//   };

//   // Fetch featured products
//   const fetchFeaturedProducts = async () => {
//     try {
//       const res = await fetch(`http://localhost:8000/api/v2/product/get-all-Featured-products/${shopId}`);
//       if (!res.ok) throw new Error("Failed to fetch featured products");
//       const data = await res.json();
//       if (data.success && data.products) {
//         setFeaturedProducts(data.products);  // Set the fetched products to the state
//       } else {
//         alert("No featured products found.");
//       }
//     } catch (error) {
//       console.error("Error fetching featured products:", error);
//       alert("Failed to load featured products. Please try again.");
//     }
//   };

//   // Handle adding a new product
//   const handleAddProduct = async () => {
//     const { name, description, category, originalPrice, discountPrice, stock, image } = newProduct;

//     if (!name || !description || !category || !originalPrice || !discountPrice || !stock || !image) {
//       alert("Please fill out all required fields.");
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:8000/api/v2/product/create-product`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...newProduct,
//           shopId,
//           shop: { name: "Your Shop Name" }, // Replace with dynamic shop name if available
//         }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setProducts([...products, data.product]);
//         alert("Product added successfully!");
//         setNewProduct({
//           name: "",
//           description: "",
//           category: "",
//           tags: "",
//           isFeatured: false,
//           originalPrice: "",
//           discountPrice: "",
//           stock: "",
//           image: "",
//         });
//       } else {
//         alert(data.message || "Failed to add product.");
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("An error occurred while adding the product. Please try again.");
//     }
//   };

//   // Handle removing a product
//   const handleRemoveProduct = async (productId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this product?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`http://localhost:8000/api/v2/product/delete-product/${productId}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Failed to delete product");

//       setProducts(products.filter((product) => product._id !== productId));
//       alert("Product removed successfully.");
//     } catch (error) {
//       console.error("Error removing product:", error);
//       alert("Failed to delete product. Please try again.");
//     }
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-gray-800 text-white h-screen p-4">
//         <h2 className="text-xl font-bold mb-4">Dashboard</h2>
//         <ul>
//           {["orders", "addProduct", "products", "support", "editProduct", "featuredProduct"].map((tab) => (
//             <li
//               key={tab}
//               className={`cursor-pointer p-2 ${activeTab === tab ? "bg-gray-700" : ""}`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1")}
//             </li>
//           ))}
//         </ul>
//         <p className="text-sm text-gray-400 mt-4">Total Orders: {orders.length}</p>
//       </div>

//       {/* Main Content */}
//       <div className="w-3/4 p-6">
//         <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>

//         {/* Add New Product Section */}
//         {activeTab === "addProduct" && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Add New Product</h2>
//             <div className="space-y-4">
//               {[{ label: "Product Name", key: "name", type: "text" },
//                 { label: "Description", key: "description", type: "textarea" },
//                 { label: "Category", key: "category", type: "text" },
//                 { label: "Tags (optional)", key: "tags", type: "text" },
//                 { label: "Original Price", key: "originalPrice", type: "number" },
//                 { label: "Discount Price", key: "discountPrice", type: "number" },
//                 { label: "Stock", key: "stock", type: "number" },
//                 { label: "Image URL", key: "image", type: "text" }].map(({ label, key, type }) => (
//                   <div key={key}>
//                     {type === "textarea" ? (
//                       <textarea
//                         placeholder={label}
//                         value={newProduct[key]}
//                         onChange={(e) => setNewProduct({ ...newProduct, [key]: e.target.value })}
//                         className="p-2 border rounded w-full"
//                       />
//                     ) : (
//                       <input
//                         type={type}
//                         placeholder={label}
//                         value={newProduct[key]}
//                         onChange={(e) => setNewProduct({ ...newProduct, [key]: e.target.value })}
//                         className="p-2 border rounded w-full"
//                       />
//                     )}
//                   </div>
//                 ))}
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={newProduct.isFeatured}
//                   onChange={() => setNewProduct({ ...newProduct, isFeatured: !newProduct.isFeatured })}
//                 />
//                 <span>Featured Product</span>
//               </label>
//               <button onClick={handleAddProduct} className="bg-blue-500 text-white p-2 rounded">
//                 Add Product
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Orders Section */}
//         {activeTab === "orders" && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Orders</h2>
//             {orders.length > 0 ? (
//               <div className="overflow-auto">
//                 <table className="w-full border-collapse border border-gray-300">
//                   <thead>
//                     <tr className="bg-gray-200">
//                       <th className="border border-gray-300 p-2">Order ID</th>
//                       <th className="border border-gray-300 p-2">Customer</th>
//                       <th className="border border-gray-300 p-2">Total Price</th>
//                       <th className="border border-gray-300 p-2">Status</th>
//                       <th className="border border-gray-300 p-2">Date</th>
//                       <th className="border border-gray-300 p-2">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {orders.map((order) => (
//                       <tr key={order._id} className="hover:bg-gray-100">
//                         <td className="border border-gray-300 p-2">{order._id}</td>
//                         <td className="border border-gray-300 p-2">{order.customer || "Unknown"}</td>
//                         <td className="border border-gray-300 p-2">₹{order.totalPrice}</td>
//                         <td className="border border-gray-300 p-2">{order.status}</td>
//                         <td className="border border-gray-300 p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
//                         <td className="border border-gray-300 p-2">
//                           <button className="text-blue-500">View</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p>No orders available.</p>
//             )}
//           </div>
//         )}

//         {/* Featured Products Section */}
//         {activeTab === "featuredProduct" && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Featured Products</h2>
//             {featuredProducts.length > 0 ? (
//               <div className="grid grid-cols-3 gap-4">
//                 {featuredProducts.map((product) => (
//                   <div key={product._id} className="p-4 border rounded">
//                     <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
//                     <h3 className="font-semibold">{product.name}</h3>
//                     <p className="text-gray-500">{product.category}</p>
//                     <p className="text-gray-700">₹{product.discountPrice}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>No featured products available.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    isFeatured: false,
    originalPrice: "",
    discountPrice: "",
    stock: "",
    image: "",
  });

  // Replace with dynamic userId and shopId retrieval logic
  const userId = localStorage.getItem("userId") || "USER_ID_HERE";
  const shopId = localStorage.getItem("shopId") || "67914202230954caf891b880";

  // Check if the user is an authorized seller
  useEffect(() => {
    const userRole = localStorage.getItem("role"); // assuming the role is stored in localStorage

    if (userRole !== "seller") {
      // Redirect to Unauthorized page if not a seller
      navigate("/unauthorized");
    }

    fetchOrders();
    fetchProducts();
    fetchFeaturedProducts();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const shopIdFromLocalStorage = shopId; // Assuming this is fetched from localStorage

      // Fetch all orders for the seller from the API
      const res = await fetch(`https://server-fmp.onrender.com/api/v2/order/get-seller-all-orders/${shopIdFromLocalStorage}`);
      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();

      if (!data.success || !data.orders) {
        throw new Error("Invalid data format or no orders found");
      }

      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Failed to load orders. Please try again.");
    }
  };

  // Fetch all products for the seller
  const fetchProducts = async () => {
    try {
      const res = await fetch(`https://server-fmp.onrender.com/api/v2/product/get-all-products-shop/${shopId}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to load products. Please try again.");
    }
  };

  // Fetch featured products
  const fetchFeaturedProducts = async () => {
    try {
      const res = await fetch(`https://server-fmp.onrender.com/api/v2/product/get-all-Featured-products/${shopId}`);
      if (!res.ok) throw new Error("Failed to fetch featured products");
      const data = await res.json();
      if (data.success && data.products) {
        setFeaturedProducts(data.products);  // Set the fetched products to the state
      } else {
        alert("No featured products found.");
      }
    } catch (error) {
      console.error("Error fetching featured products:", error);
      alert("Failed to load featured products. Please try again.");
    }
  };

  // Handle adding a new product
  const handleAddProduct = async () => {
    const { name, description, category, originalPrice, discountPrice, stock, image } = newProduct;

    if (!name || !description || !category || !originalPrice || !discountPrice || !stock || !image) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const res = await fetch(`https://server-fmp.onrender.com/api/v2/product/create-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newProduct,
          shopId,
          shop: { name: "Your Shop Name" }, // Replace with dynamic shop name if available
        }),
      });

      const data = await res.json();
      if (data.success) {
        setProducts([...products, data.product]);
        alert("Product added successfully!");
        setNewProduct({
          name: "",
          description: "",
          category: "",
          tags: "",
          isFeatured: false,
          originalPrice: "",
          discountPrice: "",
          stock: "",
          image: "",
        });
      } else {
        alert(data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product. Please try again.");
    }
  };

  // Handle removing a product
  const handleRemoveProduct = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://server-fmp.onrender.com/api/v2/product/delete-product/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");

      setProducts(products.filter((product) => product._id !== productId));
      alert("Product removed successfully.");
    } catch (error) {
      console.error("Error removing product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul>
          {["orders", "addProduct", "products", "support", "editProduct", "featuredProduct"].map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer p-2 ${activeTab === tab ? "bg-gray-700" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1")}
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-400 mt-4">Total Orders: {orders.length}</p>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>

        {/* Add New Product Section */}
        {activeTab === "addProduct" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            {/* Product Form Inputs */}
            <div className="space-y-4">
              {[{ label: "Product Name", key: "name", type: "text" },
                { label: "Description", key: "description", type: "textarea" },
                { label: "Category", key: "category", type: "text" },
                { label: "Tags (optional)", key: "tags", type: "text" },
                { label: "Original Price", key: "originalPrice", type: "number" },
                { label: "Discount Price", key: "discountPrice", type: "number" },
                { label: "Stock", key: "stock", type: "number" },
                { label: "Image URL", key: "image", type: "text" }].map(({ label, key, type }) => (
                  <div key={key}>
                    {type === "textarea" ? (
                      <textarea
                        placeholder={label}
                        value={newProduct[key]}
                        onChange={(e) => setNewProduct({ ...newProduct, [key]: e.target.value })}
                        className="p-2 border rounded w-full"
                      />
                    ) : (
                      <input
                        type={type}
                        placeholder={label}
                        value={newProduct[key]}
                        onChange={(e) => setNewProduct({ ...newProduct, [key]: e.target.value })}
                        className="p-2 border rounded w-full"
                      />
                    )}
                  </div>
                ))}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newProduct.isFeatured}
                  onChange={() => setNewProduct({ ...newProduct, isFeatured: !newProduct.isFeatured })}
                />
                <span>Featured Product</span>
              </label>
              <button onClick={handleAddProduct} className="bg-blue-500 text-white p-2 rounded">
                Add Product
              </button>
            </div>
          </div>
        )}

        {/* Orders Section */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Orders</h2>
            {/* Order Table */}
            {orders.length > 0 ? (
              <div className="overflow-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">Order ID</th>
                      <th className="border border-gray-300 p-2">Customer</th>
                      <th className="border border-gray-300 p-2">Total Price</th>
                      <th className="border border-gray-300 p-2">Status</th>
                      <th className="border border-gray-300 p-2">Date</th>
                      <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 p-2">{order._id}</td>
                        <td className="border border-gray-300 p-2">{order.customer || "Unknown"}</td>
                        <td className="border border-gray-300 p-2">₹{order.totalPrice}</td>
                        <td className="border border-gray-300 p-2">{order.status}</td>
                        <td className="border border-gray-300 p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="border border-gray-300 p-2">
                          <button className="text-blue-500">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No orders available.</p>
            )}
          </div>
        )}

        {/* Featured Products Section */}
        {activeTab === "featuredProduct" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Featured Products</h2>
            {/* Featured Products */}
            {featuredProducts.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {featuredProducts.map((product) => (
                  <div key={product._id} className="p-4 border rounded">
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-500">{product.category}</p>
                    <p className="text-gray-700">₹{product.discountPrice}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No featured products available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
