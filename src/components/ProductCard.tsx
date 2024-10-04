import { IProduct } from "../interfaces"
import Image from "./Image"
import Button from "./ui/Button"
import { txtSlicer } from "../utils/function"
import CircleColor from "./ui/CircleColor"

interface IProps {
    product: IProduct
}

const ProductCard = ({product}: IProps) => {
    /* __________ Variables __________ */
    const {title, description, colors, image, price, category} = product

    /* __________ Render __________ */
    const renderColorList = colors.map( (color) => 
        <CircleColor 
            key={color}
            color={color} 
        />
    )

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
                {renderColorList}
            </div>

            <div className="flex items-center justify-between">
                <span>{price}</span>
                <Image
                    url={category.image}
                    className="w-10 h-10 rounded-full object-center" 
                    alt={category.name}
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