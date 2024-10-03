export interface IProduct {
    id?: string | undefined;
    title: string;
    description: string;
    image: string;
    price: string;
    colors: string[];
    category: {
        name: string;
        image: string;
    }
}

export interface IInputForm {
    id: string
    name: 'title' | 'description' | 'image' | 'price'
    type: string
    label: string
}