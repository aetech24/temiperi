import { useState } from "react";
import Invoice from "./Component/Invoice/Invoice";
import OrderForm from "./Component/OrderForm/OrderForm";
import Header from "../../admin/src/components/Header/Header";

const App = () => {
  const [refreshInvoices, setRefreshInvoices] = useState(false);

  const handleInvoiceCreated = () => {
    setRefreshInvoices(!refreshInvoices);
  };

  return (
    <div className="app">
      <OrderForm onInvoiceCreated={handleInvoiceCreated} />
      <Invoice key={refreshInvoices} />
    </div>
  );
};

export default App;
