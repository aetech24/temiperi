import React, { useState, useEffect } from "react";
import axios from "axios";
import { asset } from "../../assets/assets";

const Purchase = () => {
  const [purchase, setPurchase] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get("http://localhost:4000/invoices");
        const invoices = response.data.data;

        // Get the current time and calculate 24 hours ago
        const now = new Date();
        const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        // Filter invoices created within the last 24 hours
        const recentInvoices = invoices.filter((invoice) => {
          return new Date(invoice.createdAt) > last24Hours;
        });

        // Calculate total purchases for recent invoices
        const totalPurchases = recentInvoices.reduce(
          (total, invoice) => total + invoice.totalAmount,
          0
        );
        setPurchase(totalPurchases);

        // Calculate percentage increase (dummy example, replace with actual logic)
        const previousPurchases = 1000; // Example previous purchases
        const percentageIncrease =
          ((totalPurchases - previousPurchases) / previousPurchases) * 100;
        setPercentage(percentageIncrease.toFixed(2));
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div>
      <div className="card" id="purchase">
        <img src={asset.purchase} alt="" />
        <div className="total_sales">
          <div>
            <h3>Total Purchase</h3>
            <p>GH {purchase}</p>
          </div>

          <div className="sales_percent">
            <p>Increase in sales by</p>
            <div className="percent">
              <h4>{percentage}%</h4>
            </div>
          </div>
        </div>
        <small>Last 24 hours</small>
      </div>
    </div>
  );
};

export default Purchase;
