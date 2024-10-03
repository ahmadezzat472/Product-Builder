import { IMainProduct } from "../interfaces"

export const errorValidation =  (product: IMainProduct) => {
    const errorObj: IMainProduct = {
        title: "",
        description: "",
        image: "",
        price: ""
    }

    const ValidUrl = /^(ftp|http|https):\/\/[^\s/$.?#].[^\s]*$/.test(product.image);

    if( !product.title.trim() || product.title.length<10 || product.title.length> 90) {
        errorObj.title = "Title must be at least 15 characters."
    }

    if (!product.description.trim() || product.description.length < 10 || product.description.length > 900) {
        errorObj.description = "Product description must be between 10 and 900 character"
    }

    if ( !product.image.trim() || !ValidUrl ) {
        errorObj.image = "Valid ImageUrl Required."
    }
    if ( !product.price.trim() || isNaN(Number(product.price)) ) {
        errorObj.price = "Enter Valid Price."
    }

    return errorObj;
}