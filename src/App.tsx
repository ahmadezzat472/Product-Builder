import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import { CategoryList, ProductList, colors, inputFormList } from "./data"
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IMainProduct, IProduct } from "./interfaces";
import { errorValidation, errorValidationEdit } from "./validation";
import ErrorMsg from "./components/ErrorMsg";
import CircleColor from "./components/ui/CircleColor";
import { v4 as uuid } from 'uuid'
import Select from "./components/ui/Select";
import { TName } from "./types";

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
    colors: []
  }

  /* __________ State __________ */
  const [allProducts, setAllProducts] = useState<IProduct[]> (ProductList)
  const [product, setProduct] = useState<IProduct> (defaultProduct)
  const [productEdit, setProductEdit] = useState<IProduct> (defaultProduct)
  const [errors, setErrors] = useState<IMainProduct> (defaultMainProduct)
  const [tempColors, setTempColors] = useState<string[]> ([])
  const [selectedCategory, setSelectedCategory] = useState(CategoryList[0])
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  /* __________ Handler __________ */
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const openEditModal = () => setIsOpenEditModal(true);
  const closeEditModal = () => setIsOpenEditModal(false);

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

  const handleChangeProductEdit = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setProductEdit({
      ... productEdit,
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
    setErrors(defaultMainProduct)
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
      colors: tempColors
    })

    // ** check if any item has a value of "" && check if all item have a value of ""
    const noErrorMsg = Object.values(errorObj).some(val => val == "") && Object.values(errorObj).every(val => val == "")
    
    if(!noErrorMsg){
      setErrors(errorObj)
      return
    }

    setAllProducts(prev => [{...product, colors: tempColors, category:selectedCategory, id:uuid()}, ...prev])
    handleCancel()
    console.log("SEND TO API:", allProducts);
  }

  const handleSubmitEdit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const {title, description, image, price} = productEdit

    const errorObj = errorValidationEdit({
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

    // setAllProducts(prev => [{...product, colors: tempColors, category:selectedCategory, id:uuid()}, ...prev])
    setProductEdit(defaultProduct)
    setTempColors([])
    setErrors(defaultMainProduct)
    close()
    console.log("SEND TO API:", allProducts);
  }

  /* __________ Render __________ */
  const renderProductList = allProducts.map( (product) => <ProductCard key={product.id} product={product} setProductEdit={setProductEdit} openEditModal={openEditModal} />)
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
        setErrors({
          ... errors,
          colors: []
        })
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

  const renderProductEdit = (label: string, name: TName ) => {
    return (
      <div className="flex flex-col" key={name} >
        <label 
          className="mb-2 text-sm font-medium text-gray-700"
          htmlFor={name}
        >
          {label}
        </label>

        <Input 
          type="text"
          name={name} 
          id={name} 
          value={productEdit[name]} 
          onChange={handleChangeProductEdit}
        />

        <ErrorMsg msg={errors[name]} />
      </div>
    )
  }

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

      {/* ADD MODAL */}
      <Modal isOpen={isOpen} close={close} title="ADD NEW PRODUCT">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {renderInputList}

          <div>
            <Select selected={selectedCategory}  setSelected={setSelectedCategory} />
            <ErrorMsg msg={errors.colors[0]} />
          </div>

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

      {/* Edit MODAL */}
      <Modal isOpen={isOpenEditModal} close={closeEditModal} title="ADD NEW PRODUCT">
        <form className="space-y-4" onSubmit={handleSubmitEdit}>
          {renderProductEdit("Product title", "title")}
          {renderProductEdit("Product description", "description")}
          {renderProductEdit("ImageUrl", "image")}
          {renderProductEdit("Product price", "price")}

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
