import { TName } from "../types";

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

export interface IMainProduct {
    title: string;
    description: string;
    image: string;
    price: string;
    colors: string[]
}

export interface IInputForm {
    id: string;
    name: TName
    type: string;
    label: string;
}

export interface ICategory {
    id: string;
    name: string;
    image: string;
}