import client from "../client";

export const reserveMenuItemRequest = async <T>(menuId: string, mealTimeId: string) => {
    return await client.get<T>(`/reserve/reserve-menu/${menuId}/${mealTimeId}`)
};


export const getAllReserved = async () => {
    return await client.get(`/reserve/all`)
};


export const getTodayRerservesRequest = async () => {
    return await client.get(`/reserve/today`)
};