<<<<<<< HEAD
import React from "react";
import "./analysis.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { NavLink } from "react-router-dom";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Orders from "../Orders/Orders";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Analysis = () => {
  //url endpoints for the order component
  const url = "https://temiperi-backend.onrender.com";
  const devUrl = "http://localhost:4000/temiperi";

  const MyBarChart = () => {
    // Define the data for the chart
    const data = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Sales (gh)",
          data: [3000, 2000, 5000, 4000, 6000, 7000, 100, 500, 3030],
          backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
          borderColor: "rgba(75, 192, 192, 1)",
=======
import React from 'react'
import './analysis.css'
import { Sidebar } from '../Sidebar/Sidebar'
import { NavLink } from 'react-router-dom'
import { Bar , Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import Orders from '../Orders/Orders';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


const Analysis = () => {
  
  const MyBarChart = () => {
    // Define the data for the chart
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Sales (gh)',
          data: [3000, 2000, 5000, 4000, 6000, 7000, 100, 500, 3030,],
          backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
          borderColor: 'rgba(75, 192, 192, 1)',
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
          borderWidth: 1,
        },
      ],
    };
<<<<<<< HEAD

=======
  
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
    // Define optional settings for the chart
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
<<<<<<< HEAD
          position: "top",
=======
          position: 'top',
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
<<<<<<< HEAD
            text: "Sales in Cedis",
=======
            text: 'Sales in Cedis',
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
          },
        },
        x: {
          title: {
            display: true,
<<<<<<< HEAD
            text: "Months",
=======
            text: 'Months',
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
          },
        },
      },
    };
<<<<<<< HEAD

    return (
      <div style={{ width: "600px", height: "400px" }}>
=======
  
    return (
      <div style={{ width: '600px', height: '400px' }}>
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
        <Bar data={data} options={options} />
      </div>
    );
  };
<<<<<<< HEAD

  return (
    <div>
      {/* <Header /> */}
      <Orders url={devUrl} />
=======
  
  

  return (
    <div>
      <Header />
      <Orders />
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
      <h2>Perfomance Analysis</h2>

      <div className="container">
        {/* ====================== sidebar Component ============================ */}
        <Sidebar />

        <div className="div">
          <div className="filer">
<<<<<<< HEAD
=======

>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
            {/* ================= filter container for products ================ */}

            <div className="product_filter_container">
              <label htmlFor="">
<<<<<<< HEAD
                Category
                <select>
=======
                Category 
                <select >
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
                  <option value="">ABL</option>
                  <option value="">Water</option>
                  <option value="">Pet Drinks</option>
                  <option value="">Guniness</option>
                </select>
              </label>

<<<<<<< HEAD
              <label htmlFor="">product</label>

              <label htmlFor="">
                Month
                <select name="month" id="">
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
=======
              <label htmlFor="">
                product
              </label>

              <label htmlFor="">
                Month 
                <select name="" id="">
                  <option value="">January</option>
                  <option value="">Febuary</option>
                  <option value="">March</option>
                  <option value="">April</option>
                  <option value="">May</option>
                  <option value="">June</option>
                  <option value="">July</option>
                  <option value="">August</option>
                  <option value="">September</option>
                  <option value="">October</option>
                  <option value="">November</option>
                  <option value="">Decembber</option>
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
                </select>
              </label>

              <label htmlFor="">
                Week
                <select name="" id="">
                  <option value="">Week 1</option>
                  <option value="">Week 2</option>
                  <option value="">Week 3</option>
                  <option value="">Week 4</option>
                </select>
              </label>

              <label htmlFor="">
<<<<<<< HEAD
                Date
=======
                Date 
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
                <input type="date" />
              </label>
            </div>
          </div>

          {/* ========================= chart js integration ===================== */}
          <div className="chart_container">
            <div className="myChart">
              <MyBarChart />
            </div>
            <div className="best_performing_product">
              <h4>Best Performing Products</h4>
              <div className="best_products">
<<<<<<< HEAD
                <div className="products_details">
=======
                <div className='products_details'>
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
                  <p>Product 1</p>
                  <small></small>
                </div>

<<<<<<< HEAD
                <div className="products_details">
=======
                <div className='products_details'>
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
                  <p>Product 2</p>
                  <small></small>
                </div>

<<<<<<< HEAD
                <div className="products_details">
=======
                <div className='products_details'>
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
                  <p>Product 2</p>
                  <small></small>
                </div>

<<<<<<< HEAD
                <div className="products_details">
=======
                <div className='products_details'>
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
                  <p>Product 2</p>
                  <small></small>
                </div>
              </div>
            </div>
          </div>

          {/* ========================= Report btn ===================== */}
          <div className="btn report">
<<<<<<< HEAD
            <NavLink to={"/report"}>
              <button>Write Report</button>
            </NavLink>
          </div>
        </div>
=======
            <NavLink to={'/report'}>
              <button >Write Report</button>
            </NavLink>
          </div>
        </div>
         
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
      </div>

      {/* ==================== brife Report Summary ============= */}
      <div className="performance_summary">
        <h3>Performance Summary</h3>
<<<<<<< HEAD
        <p>
          <small>1. </small>Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Repudiandae distinctio harum mollitia suscipit ullam sint? Illo
          repellendus repellat magnam, eaque iste odit provident sunt similique
          inventore, quibusdam consequatur, enim ipsa?
        </p>

        <p>
          <small>2. </small>Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Repudiandae distinctio harum mollitia suscipit ullam sint? Illo
          repellendus repellat magnam, eaque iste odit provident sunt similique
          inventore, quibusdam consequatur, enim ipsa?
        </p>

        <p>
          <small>3. </small>Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Repudiandae distinctio harum mollitia suscipit ullam sint? Illo
          repellendus repellat magnam, eaque iste odit provident sunt similique
          inventore, quibusdam consequatur, enim ipsa?
        </p>
=======
        <p></p>

        <p></p>

        <p></p>
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
      </div>

      <Footer />
    </div>
<<<<<<< HEAD
  );
};

export default Analysis;
=======
  )
}

export default Analysis
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
