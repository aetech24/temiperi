<<<<<<< HEAD
import React, { useState } from 'react'
=======
import { useState } from 'react'
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
import Invoice from './Component/Invoice/Invoice'
import OrderForm from './Component/OrderForm/OrderForm'

const App = () => {

   const [refreshInvoices, setRefreshInvoices] = useState(false)

   const handleInvoiceCreated = () => {
    setRefreshInvoices(!refreshInvoices)
   }

  return (
    <div className='app'>
      <OrderForm onInvoiceCreated={handleInvoiceCreated} />
      <Invoice key={refreshInvoices}/>
    </div>
  )
}

export default App