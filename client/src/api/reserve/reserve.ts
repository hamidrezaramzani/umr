import client from "../client";

export const reserveMenuItemRequest = async (menuId: string) => {
    return client.get(`/reserve/reserve-menu/${menuId}`)
};


export const getAllReserved = async () => {
    return client.get(`/reserve/all`)
};