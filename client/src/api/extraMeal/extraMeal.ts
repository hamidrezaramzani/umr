import { ExtraFoodFormValues } from "../../pages/Admin/ExtraMealFormPage/ExtraMealFormPage";
import client from "../client";

export const addExtraMealRequest = async (value: ExtraFoodFormValues) => {
    return await client.post("/extraMeal/add", value);
}

export const getExtraMealsRequest = async <T>() => {
    return await client.get<T>("/extraMeal/all")
};


export const deleteExtraMealRequest = async (id: string) => {
    return await client.delete(`/extraMeal/delete/${id}`);
};