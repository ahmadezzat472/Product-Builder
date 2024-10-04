import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import { ProductList, colors, inputFormList } from "./data"
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IMainProduct, IProduct } from "./interfaces";
import { errorValidation } from "./validation";
import ErrorMsg from "./components/ErrorMsg";
import CircleColor from "./components/ui/CircleColor";
import { v4 as uuid } from 'uuid'

function App() {
  /* __________ Variables __________ */
  const defaultProduct = {
    title: '',
    description: '',
    image: '',
    price: '',
    colors: [],
    category: {
      name: '',
      image: ''
    }
  }

  const defaultMainProduct = {
    title: '',
    description: '',
    image: '',
    price: '',
  }

  /* __________ State __________ */
  const [isOpen, setIsOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<IProduct[]> (ProductList)
  const [product, setProduct] = useState<IProduct> (defaultProduct)
  const [errors, setErrors] = useState<IMainProduct> (defaultMainProduct)
  const [tempColors, setTempColors] = useState<string[]> ([])

  /* __________ Handler __________ */
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleChangeProduct = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setProduct({
      ... product,
      [name]: value
    })

    setErrors({
      ... errors,
      [name]: ""
    })
  }

  const handleCancel = () => {
    setProduct(defaultProduct)
    setTempColors([])
    close()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const {title, description, image, price} = product

    const errorObj = errorValidation({
      title,
      description,
      image,
      price,
    })

    // ** check if any item has a value of "" && check if all item have a value of ""
    const noErrorMsg = Object.values(errorObj).some(val => val == "") && Object.values(errorObj).every(val => val == "")
    
    if(!noErrorMsg){
      setErrors(errorObj)
      return
    }

    setAllProducts(prev => [{...product, colors: tempColors, id:uuid()}, ...prev])
    handleCancel()
    console.log("SEND TO API");
  }

  /* __________ Render __________ */
  const renderProductList = allProducts.map( (product) => <ProductCard key={product.id} product={product}/>)
  const renderInputList = inputFormList.map( (input) => 
    <div className="flex flex-col" key={input.id} >
      <label 
        className="mb-2 text-sm font-medium text-gray-700"
        htmlFor={input.id}
      >
        {input.label}
      </label>

      <Input 
        type={input.type} 
        name={input.name} 
        id={input.id} 
        value={product[input.name]} 
        onChange={handleChangeProduct}
      />

      <ErrorMsg msg={errors[input.name]} />
    </div>
  )
  const renderColorList = colors.map( (color) => 
    <CircleColor 
      key={color}
      color={color} 
      onClick={() => {
        if(tempColors.includes(color)){
          setTempColors( prev => prev.filter(item => item != color))
          return
        }
        setTempColors( prev => [...prev, color] )
      }}
    />
  )

  const tempColorList = tempColors.map( (color) => 
    <span 
      key={color}
      className="p-1 rounded-md text-xs text-white" 
      style={ {backgroundColor: color} }
    >
      {color}
    </span>
  )

  console.log(tempColors, tempColorList);
  
  
  return (
    <main className="container">
      <Button 
        className="bg-indigo-600 hover:bg-indigo-800" 
        onClick={ open }
      >
        ADD
      </Button>

      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-3">
        {renderProductList}
      </div>

      <Modal isOpen={isOpen} close={close} title="ADD NEW PRODUCT">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {renderInputList}

          <div className="flex space-x-1 items-center flex-wrap">
            {renderColorList}
          </div>

          {
            tempColorList.length > 0 && 
            <div className="flex space-x-2 items-center flex-wrap">
              {tempColorList}
            </div>
          }

          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-600 hover:bg-indigo-800">Submit</Button>
            <Button className="bg-gray-400 hover:bg-gray-600" onClick={handleCancel}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default App
