import client from "../client";

export const reserveMenuItemRequest = async (menuId: string) => {
    return await client.get(`/reserve/reserve-menu/${menuId}`)
};


export const getAllReserved = async () => {
    return await client.get(`/reserve/all`)
};


export const getTodayRerservesRequest = async () => {
    return await client.get(`/reserve/today`)
};