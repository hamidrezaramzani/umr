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

export const editMealRequest = async (values: FormData, mealId: string) => {
    return await client.put(`/meal/edit-meal/${mealId}`, values);
}

export const getSingleMealRequest = async (mealId: string | undefined) => {
    return await client.get(`/meal/one/${mealId}`);
}


export const downloadCurrentWeekQrCodeRequest = async (week: number) => {
    return await client.get(`/meal/download-qrcode/${week}`);
}