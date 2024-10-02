import { useState } from "react";
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import { ProductList } from "./data"
import Button from "./components/ui/Button";

function App() {
  /* __________ State __________ */
  const [isOpen, setIsOpen] = useState(false);

  /* __________ Handler __________ */
  function open() {
    setIsOpen(true);
  }
  
  function close() {
    setIsOpen(false);
  }
  
  /* __________ Render __________ */
  const renderList = ProductList.map( (product) => <ProductCard key={product.id} product={product}/>)
  
  return (
    <main className="container">
      <Button 
        className="bg-indigo-600 hover:bg-indigo-800" 
        onClick={ open }
      >
        ADD
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-3">
        {renderList}
      </div>
      <Modal isOpen={isOpen} close={close} title="ADD NEW PRODUCT">
        <div className="flex items-center space-x-3">
          <Button className="bg-indigo-600 hover:bg-indigo-800">Submit</Button>
          <Button className="bg-gray-400 hover:bg-gray-600">Cancel</Button>
        </div>
      </Modal>
    </main>
  )
}

export default App
