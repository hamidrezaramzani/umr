import { MealTimeFormValues } from "./../../pages/Admin/MealTimeFormPage/MealTimeFormPage";
import client from "../client";

export const addMealTimeRequest = async (values: MealTimeFormValues) => {
    return await client.post("/mealTime/add", values)
};


export const getMealTimesRequest = async <T>() => {
    return await client.get<T>("/mealTime/all")
};


export const getSingleMealTimeRequest = async (mealTimeId: string  | undefined) => {
    return await client.get(`/mealTime/one/${mealTimeId}`);
};

export const deleteMealTimeRequest = async (id: string) => {
    return await client.delete(`/mealTime/delete/${id}`);
};

export const editMealTimeRequest = async (values: MealTimeFormValues, mealTimeId: string) => {
    return await client.put(`/mealTime/edit/${mealTimeId}`, values);
}