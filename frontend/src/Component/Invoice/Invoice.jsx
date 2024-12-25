import { useEffect, useRef, useState } from 'react'
import './invoice.css'
import { asset } from '../../assets/assets'
import axios from 'axios'


const Invoice = () => {
   const [invoices, setInvoices] = useState([]);
   const printRef= useRef();


   useEffect(() => {
      const fetchInvoices = async () => {
         try {
            const response = await axios.get(
              "http://localhost:4000/temiperi/invoice"
            );
            console.log(response.data);
            setInvoices(response.data.invoice)

         } catch (error) {
           console.log('Error fetching invoices: ' + error);
           console.log(error)
         }
      };
      fetchInvoices();
   }, [])

   const handlePrint = (invoice) => {
      const printableContent = `
         <div>
            <h2>Invoice: ${invoice.invoiceNumber}</h2>
            <p>Customer: ${invoice.customerName}</p>
            <p>Total Amount: ${invoice.totalAmount}</p>

            <h3>Items: </h3>
            <ul>
          ${invoice.items
            .map(
              (item) => `
            <li>${item.description} - ${item.quantity} x GH${item.price}</li>`
            )
            .join("")}
        </ul>
         </div>
      `;

      //open a new window and print
   const printWindow = window.open('', '_blank', 'width=800', 'height=600');
   printWindow.document.write(printableContent);
   printWindow.document.close();
   printWindow.print();
   }



  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

 

  return (
    <div className="invoice_container">
      <img src={asset.logo} alt="" width={120} />

      <div className="date">
        <b>Date: {formattedDate}</b>
        <b> Time: {formattedTime}</b>
      </div>

      <div className="company_name">
        <h1>Invoices</h1>
        <div className="way_bill">
          <h3>Way Bill</h3>
        </div>
      </div>

      <ul>
        {Array.isArray(invoices) && invoices.map((invoice) => (
            <li key={invoice._id} className='invoice_details'>
               <strong>{invoice.invoiceNumber}</strong> - {invoice.customerName} - GH{invoice.totalAmount}
               <button onClick={() => handlePrint(invoice)}>Print</button>
            </li>
         ))}
      </ul>
    </div>
  );
}

export default Invoice