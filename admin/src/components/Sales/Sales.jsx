import { useEffect, useState } from "react";
import { asset } from "../../assets/assets";

const Sales = () => {
  const [totalSales, setTotalSales] = useState(0); // To store total sales amount
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(
          "https://temiperi-stocks-backend.onrender.com/temiperi/orders"
        );
        const salesData = await response.json();

        // Filter sales from the last 24 hours
        const now = new Date();
        const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const recentSales = salesData.filter((sale) => {
          const saleDate = new Date(sale.date); // Adjust 'sale.date' to match your API's date field
          return saleDate >= last24Hours && saleDate <= now;
        });

        // Calculate total sales amount
        const total = recentSales.reduce((sum, sale) => sum + sale.totalAmount, 0); // Adjust 'sale.totalAmount' to match your API's field
        setTotalSales(total);
        setProducts(salesData); // Optionally set all products if needed
      } catch (error) {
        console.error("Failed to fetch sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div>
      <div className="card" id="sales">
        <img src={asset.sale} alt="Sales" />

        <div className="total_sales">
          <div>
            <h3>Total Sales</h3>
            <p>GH₵ {totalSales.toFixed(2)}</p>
          </div>
        </div>
        <small>Last 24 hours</small>
      </div>
    </div>
  );
};

export default Sales;
