import client from "../client"

export const addMealRequest = async (values: FormData) => {
    return await client.post("/meal/add-meal", values);
}

export const getMealsRequest = async <T>() => {
    return await client.get<T>("/meal/all");
}


export const deleteMealRequest = async (mealId: string) => {
    return await client.delete(`/meal/delete/${mealId}`);
}