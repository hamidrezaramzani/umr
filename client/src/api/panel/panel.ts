import client from "../client"

export const getPanelValues = async <T>() => {
    return await client.get<T>("/panel/panel-values");
}