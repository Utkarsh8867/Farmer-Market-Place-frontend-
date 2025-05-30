


// import React, { useEffect, useState } from "react";
// import { FiUser } from "react-icons/fi";

// function AdminDashboard() {
//   const [orders, setOrders] = useState([]);
//   const [sellers, setSellers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedSellerProducts, setSelectedSellerProducts] = useState([]);
//   const [selectedSection, setSelectedSection] = useState("orders");

//   useEffect(() => {
//     fetchOrders();
//     fetchSellers();
//     fetchProducts();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/api/v2/order/admin-all-orders");
//       const data = await res.json();
//       setOrders(data.orders || []);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const fetchSellers = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/api/v2/shop/admin-all-sellers");
//       const data = await res.json();
//       setSellers(data.sellers || []);
//     } catch (error) {
//       console.error("Error fetching sellers:", error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/api/v2/product/get-all-products");
//       const data = await res.json();
//       setProducts(data.products || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const fetchSellerProducts = async (sellerId) => {
//     try {
//       if (!sellerId) {
//         console.error("Seller ID is undefined.");
//         return;
//       }

//       const response = await fetch(`http://localhost:8000/api/v2/product/get-all-products-shop/${sellerId}`);
      
//       if (!response.ok) {
//         throw new Error("Failed to fetch seller products");
//       }

//       const data = await response.json();
//       setSelectedSellerProducts(data.products || []);
//       setSelectedSection("products");
//     } catch (error) {
//       console.error("Error fetching seller products:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md">
//         <div className="p-4 border-b">
//           <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
//         </div>
//         <nav className="mt-4">
//           <ul className="space-y-2">
//             <li>
//               <button
//                 onClick={() => setSelectedSection("orders")}
//                 className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
//               >
//                 Orders
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setSelectedSection("sellers")}
//                 className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
//               >
//                 Sellers
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setSelectedSection("products")}
//                 className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
//               >
//                 Products
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">Admin Dashboard</h2>
//           <div className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
//             <FiUser className="text-xl text-gray-600" />
//           </div>
//         </div>

//         {/* Orders Section */}
//         {selectedSection === "orders" && (
//           <div>
//             <h3 className="text-xl font-bold mb-4">All Orders</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white border">
//                 <thead>
//                   <tr className="border-b bg-gray-100">
//                     <th className="px-6 py-3 text-left text-gray-600">Order ID</th>
//                     <th className="px-6 py-3 text-left text-gray-600">Customer</th>
//                     <th className="px-6 py-3 text-left text-gray-600">Total</th>
//                     <th className="px-6 py-3 text-left text-gray-600">Status</th>
//                     <th className="px-6 py-3 text-left text-gray-600">Shipping Address</th>
//                     <th className="px-6 py-3 text-left text-gray-600">Delivered At</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map((order) => (
//                     <tr className="border-b" key={order._id}>
//                       <td className="px-6 py-4">{order._id}</td>
//                       <td className="px-6 py-4">{order.user?.name || "N/A"}</td>
//                       <td className="px-6 py-4">₹{order.totalPrice}</td>
//                       <td className="px-6 py-4">{order.status}</td>
//                       <td className="px-6 py-4">
//                         {order.shippingAddress?.address}, {order.shippingAddress?.city}
//                       </td>
//                       <td className="px-6 py-4">{order.deliveredAt || "Pending"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Sellers Section */}
//         {selectedSection === "sellers" && (
//           <div>
//             <h3 className="text-xl font-bold mb-4">All Sellers</h3>
//             <ul>
//               {sellers.map((seller) => (
//                 <li key={seller._id} className="border p-4 rounded mb-2">
//                   <p><strong>Name:</strong> {seller.name}</p>
//                   <p><strong>Email:</strong> {seller.email}</p>
//                   <p><strong>Description:</strong> {seller.description}</p>
//                   <button
//                     onClick={() => fetchSellerProducts(seller._id)}
//                     className="mt-2 text-blue-500"
//                   >
//                     See All Products
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Products Section */}
//         {selectedSection === "products" && selectedSellerProducts.length > 0 && (
//           <div>
//             <h3 className="text-xl font-bold mb-4">Products of Selected Seller</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {selectedSellerProducts.map((product) => (
//                 <div key={product._id} className="border p-4 rounded">
//                   <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
//                   <h4 className="font-bold">{product.name}</h4>
//                   <p>Price: ₹{product.discountPrice}</p>
//                   <p>Rating: {product.rating} / 5</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSellerProducts, setSelectedSellerProducts] = useState([]);
  const [selectedSection, setSelectedSection] = useState("orders");
  const navigate = useNavigate();

  useEffect(() => {
    // Check role from localStorage or any authentication provider
    const token = localStorage.getItem("token");

    if (!token) {
      // No token, redirect to login
      navigate("/login");
    } else {
      const userData = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
      if (userData.role !== "admin") {
        // Not an admin, redirect to Unauthorized page
        navigate("/unauthorized");
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchOrders();
    fetchSellers();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("https://server-fmp.onrender.com/api/v2/order/admin-all-orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchSellers = async () => {
    try {
      const res = await fetch("https://server-fmp.onrender.com/api/v2/shop/admin-all-sellers");
      const data = await res.json();
      setSellers(data.sellers || []);
    } catch (error) {
      console.error("Error fetching sellers:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://server-fmp.onrender.com/api/v2/product/get-all-products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchSellerProducts = async (sellerId) => {
    try {
      if (!sellerId) {
        console.error("Seller ID is undefined.");
        return;
      }

      const response = await fetch(`https://server-fmp.onrender.com/api/v2/product/get-all-products-shop/${sellerId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch seller products");
      }

      const data = await response.json();
      setSelectedSellerProducts(data.products || []);
      setSelectedSection("products");
    } catch (error) {
      console.error("Error fetching seller products:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedSection("orders")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
              >
                Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection("sellers")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
              >
                Sellers
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection("products")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
              >
                Products
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <div className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
            <FiUser className="text-xl text-gray-600" />
          </div>
        </div>

        {/* Render sections conditionally */}
        {selectedSection === "orders" && <OrdersSection orders={orders} />}
        {selectedSection === "sellers" && <SellersSection sellers={sellers} fetchSellerProducts={fetchSellerProducts} />}
        {selectedSection === "products" && selectedSellerProducts.length > 0 && (
          <ProductsSection products={selectedSellerProducts} />
        )}
      </main>
    </div>
  );
}

// Helper components for sections
const OrdersSection = ({ orders }) => (
  <div>
    <h3 className="text-xl font-bold mb-4">All Orders</h3>
    <table className="min-w-full bg-white border">
      <thead>
        <tr className="border-b bg-gray-100">
          <th className="px-6 py-3 text-left text-gray-600">Order ID</th>
          <th className="px-6 py-3 text-left text-gray-600">Customer</th>
          <th className="px-6 py-3 text-left text-gray-600">Total</th>
          <th className="px-6 py-3 text-left text-gray-600">Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr className="border-b" key={order._id}>
            <td className="px-6 py-4">{order._id}</td>
            <td className="px-6 py-4">{order.user?.name || "N/A"}</td>
            <td className="px-6 py-4">₹{order.totalPrice}</td>
            <td className="px-6 py-4">{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SellersSection = ({ sellers, fetchSellerProducts }) => (
  <div>
    <h3 className="text-xl font-bold mb-4">All Sellers</h3>
    <ul>
      {sellers.map((seller) => (
        <li key={seller._id} className="border p-4 rounded mb-2">
          <p><strong>Name:</strong> {seller.name}</p>
          <p><strong>Email:</strong> {seller.email}</p>
          <button onClick={() => fetchSellerProducts(seller._id)} className="mt-2 text-blue-500">
            See All Products
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const ProductsSection = ({ products }) => (
  <div>
    <h3 className="text-xl font-bold mb-4">Products of Selected Seller</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
          <h4 className="font-bold">{product.name}</h4>
          <p>Price: ₹{product.discountPrice}</p>
          <p>Rating: {product.rating} / 5</p>
        </div>
      ))}
    </div>
  </div>
);

export default AdminDashboard;
