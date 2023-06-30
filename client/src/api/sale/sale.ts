import client from "../client";

export const toggleSaleRequest = async (reserveId?: string) => {
    return await client.get(`/sale/toggle/${reserveId}`);
};

export const buySaleMenuRequest = async (saleId: string) => {
    return await client.get(`/sale/buy/${saleId}`);
}