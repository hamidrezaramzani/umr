import client from "../client"

export const addMealRequest = async (values: FormData) => {
    return await client.post("/meal/add-meal", values);
}