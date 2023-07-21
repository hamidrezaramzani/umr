import client from "../client";

export const toggleSaleRequest = async <T>(reserveId?: string) => {
    return await client.get<T>(`/sale/toggle/${reserveId}`);
};

export const buySaleMenuRequest = async <T>(saleId: string) => {
    return await client.get<T>(`/sale/buy/${saleId}`);
}