import { IProduct } from "../interfaces"
import Image from "./Image"
import Button from "./ui/Button"
import { txtSlicer } from "../utils/function"
import CircleColor from "./ui/CircleColor"

interface IProps {
    product: IProduct
}

const ProductCard = ({product}: IProps) => {
    const {title, description, image} = product
    return (
        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-lg p-3" >
            <Image
                url={image}
                className="rounded-md h-52 w-full lg:object-cover" 
                alt="product name" 
            />

            <h3>{title}</h3>

            <p>{txtSlicer(description)}</p>

            <div className="flex items-center my-3 space-x-2">
                <CircleColor color="#1d4ed8" />
                <CircleColor color="#15803d" />
                <CircleColor color="#b91c1c" />
            </div>

            <div className="flex items-center justify-between">
                <span>$500,000</span>
                <Image
                    url="https://static.toiimg.com/photo/80387978.cms" 
                    className="w-10 h-10 rounded-full object-center" 
                    alt="product name" 
                />
            </div>

            <div className="flex items-center space-x-2 mt-3 text-white">
                <Button className="bg-blue-700" onClick={() => {console.log("dddd");
                }}  >Edit</Button>
                <Button className="bg-red-700">Delete</Button>
                <Button className="bg-green-700">Success</Button>
                <Button className="bg-gray-400">Cancel</Button>
            </div>

        </div>
    )
}


export default ProductCard