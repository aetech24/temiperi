import { useEffect, useState } from "react";
import "./invoice.css";
import { asset } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/temiperi/invoice"
        );
        setInvoices(response.data);
      } catch (error) {
        console.log("Error fetching invoices: " + error);
        toast.error("Error fetching invoices");
      }
    };
    fetchInvoices();
  }, []);

  const handlePrint = (invoice) => {
    const printableContent = `
         <div>
            <h2>Invoice: ${invoice.invoiceNumber}</h2>
            <p>Customer: ${invoice.customerName}</p>
            <p>Total Amount: ${invoice.totalAmount}</p>

            <h3>Items: </h3>
             <ul>
               {invoices.map((invoice) => (
               <li key={invoice._id}>
                  <strong>{invoice.invoiceNumber}</strong> - {invoice.customerName} - ${invoice.totalAmount}
                </li>
             ))}
         </ul>   
         </div>
      `;

    //open a new window and print
    const printWindow = window.open("", "_blank", "width=800", "height=600");
    printWindow.document.write(printableContent);
    printWindow.document.close();
    printWindow.print();
  };

  // const fetchOrder = async () => {
  //    const response = await axios.get(`${url}/temiperi/order`)
  //    if(response.data.success){
  //       setOrder(response.data.data)
  //    } else {
  //       toast.error('error')
  //    }
  // }

  const date = new Date().getDate();
  const time = new Date().getHours();
  const minute = new Date().getMinutes();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  return (
    <div className="invoice_container">
      <img src={asset.logo} alt="" width={120} />

      <div className="date">
        <b>Date: {date}</b>
        <b> {month + 1}</b>
        <b> {year + ", "}</b>
        <b>Time: {time}</b>
        <b> {minute}</b>
      </div>

      <div className="company_name">
        <h1>Invoices</h1>
        <div className="way_bill">
          <h3>Way Bill</h3>
        </div>
      </div>

      <ul>
        {invoices.map((invoice) => (
          <li key={invoice._id}>
            <strong>{invoice.invoiceNumber}</strong> - {invoice.customerName} -
            ${invoice.totalAmount}
            <button onClick={() => handlePrint(invoice)}>Print</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Invoice;
