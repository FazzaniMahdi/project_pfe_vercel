import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaCreditCard, FaSignOutAlt } from "react-icons/fa";
import {
  getNombrededevis,
  getTotalChifre,
} from "../../app/devis_slices/devisSlice";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  // Fonction pour basculer la visibilité de la sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNombrededevis());
    dispatch(getTotalChifre());
  }, []);

  const nombredevis = useSelector((state) => state.DevisCrud.nombreDeDevis);
  console.log(nombredevis);
  const totalchifre = useSelector((state) => state.DevisCrud.totalchifre);
  console.log(totalchifre);
  return (
    <div className="container">
      <div className={`navigation ${isSidebarOpen ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="speedometer-outline"></ion-icon>
              </span>
              <span className="title">ERP Logicom</span>
            </a>
          </li>

          {[
            { name: "Dashboard", icon: "home-outline", path: "/dashboard" },
            { name: "Clients", icon: "people-outline", path: "/ClientFormTout" },
            { name: "devis", icon: "chatbubble-outline", path: "/DevisList" },
            {
              name: "devistout",
              icon: "lock-closed-outline",
              path: "/DevisFormTout",
            },
            {
              name: "les societes",
              icon: "help-outline",
              path: "/SocietiesList",
            },
            { name: "Settings", icon: "settings-outline", path: "/" },
            {
              name: "Deconnexion",
              icon: "log-out-outline",
              path: "/deconnexion",
            },
          ].map((item, index) => (
            <li key={index}>
              {/* Use Link instead of <a> */}
              <Link to={item.path}>
                <span className="icon">
                  <ion-icon name={item.icon}></ion-icon>
                </span>
                <span className="title">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={`main ${isSidebarOpen ? "active" : ""}`}>
        <div className="topbar">
          <div className="toggle" onClick={toggleSidebar}>
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <div className="search">
            <label>
              <input type="text" placeholder="Search here" />
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>

          <div className="relative inline-block text-left">
            {/* Avatar avec événement de clic */}
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
              <img
                src="assets/imgs/customer01.jpg"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
              {/* Indicateur de statut en ligne */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Menu déroulant */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-4 flex items-center border-b">
                  <img
                    src="assets/imgs/customer01.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-gray-500">Admin</p>
                  </div>
                </div>
                <ul className="py-2">
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                    <FaUser className="mr-3" /> My Profile
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                    <FaCog className="mr-3" /> Settings
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer relative">
                    <FaCreditCard className="mr-3" /> Billing
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      4
                    </span>
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer border-t">
                    <FaSignOutAlt className="mr-3" /> Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="cardBox">
          {[
            {
              number: nombredevis,
              name: "Nombre devis generes ",
              icon: "cart-outline",
            },
            {
              number: totalchifre.toFixed(2),
              name: "total chifre",
              icon: "cash-outline",
            },
            {
              number: nombredevis,
              name: "Nombre devis generes ",
              icon: "cart-outline",
            },
            {
              number: totalchifre.toFixed(2),
              name: "total chifre",
              icon: "cash-outline",
            },
          ].map((card, index) => (
            <div className="card" key={index}>
              <div>
                <div className="numbers">{card.number}</div>
                <div className="cardName">{card.name}</div>
              </div>
              <div className="iconBx">
                <ion-icon name={card.icon}></ion-icon>
              </div>
            </div>
          ))}
        </div>

        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Recent Orders</h2>
              <a href="#" className="btn">
                View All
              </a>
            </div>

            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Payment</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Star Refrigerator",
                    price: "$1200",
                    payment: "Paid",
                    status: "delivered",
                  },
                  {
                    name: "Dell Laptop",
                    price: "$110",
                    payment: "Due",
                    status: "pending",
                  },
                  {
                    name: "Apple Watch",
                    price: "$1200",
                    payment: "Paid",
                    status: "return",
                  },
                  {
                    name: "Addidas Shoes",
                    price: "$620",
                    payment: "Due",
                    status: "inProgress",
                  },
                ].map((order, index) => (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.price}</td>
                    <td>{order.payment}</td>
                    <td>
                      <span className={`status ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="recentCustomers">
            <div className="cardHeader">
              <h2>Recent Customers</h2>
            </div>
            <table>
              <tbody>
                {[
                  {
                    name: "David",
                    country: "Italy",
                    img: "assets/imgs/customer02.jpg",
                  },
                  {
                    name: "Amit",
                    country: "India",
                    img: "assets/imgs/customer01.jpg",
                  },
                ].map((customer, index) => (
                  <tr key={index}>
                    <td width="60px">
                      <div className="imgBx">
                        <img src={customer.img} alt="Customer" />
                      </div>
                    </td>
                    <td>
                      <h4>
                        {customer.name} <br /> <span>{customer.country}</span>
                      </h4>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
