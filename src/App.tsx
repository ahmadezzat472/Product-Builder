import ProductCard from "./components/ProductCard"
import { ProductList } from "./data"

function App() {
  const renderList = ProductList.map( (product) => <ProductCard key={product.id} product={product}/>)

  return (
    <main className="container">
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-3">
        {renderList}
      </div>
    </main>
  )
}

export default App
