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
          borderWidth: 1,
        },
      ],
    };
  
    // Define optional settings for the chart
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
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
            text: 'Sales in Cedis',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Months',
          },
        },
      },
    };
  
    return (
      <div style={{ width: '600px', height: '400px' }}>
        <Bar data={data} options={options} />
      </div>
    );
  };
  
  

  return (
    <div>
      <Header />
      <Orders />
      <h2>Perfomance Analysis</h2>

      <div className="container">
        {/* ====================== sidebar Component ============================ */}
        <Sidebar />

        <div className="div">
          <div className="filer">

            {/* ================= filter container for products ================ */}

            <div className="product_filter_container">
              <label htmlFor="">
                Category 
                <select >
                  <option value="">ABL</option>
                  <option value="">Water</option>
                  <option value="">Pet Drinks</option>
                  <option value="">Guniness</option>
                </select>
              </label>

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
                Date 
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
                <div className='products_details'>
                  <p>Product 1</p>
                  <small></small>
                </div>

                <div className='products_details'>
                  <p>Product 2</p>
                  <small></small>
                </div>

                <div className='products_details'>
                  <p>Product 2</p>
                  <small></small>
                </div>

                <div className='products_details'>
                  <p>Product 2</p>
                  <small></small>
                </div>
              </div>
            </div>
          </div>

          {/* ========================= Report btn ===================== */}
          <div className="btn report">
            <NavLink to={'/report'}>
              <button >Write Report</button>
            </NavLink>
          </div>
        </div>
         
      </div>

      {/* ==================== brife Report Summary ============= */}
      <div className="performance_summary">
        <h3>Performance Summary</h3>
        <p></p>

        <p></p>

        <p></p>
      </div>

      <Footer />
    </div>
  )
}

export default Analysis