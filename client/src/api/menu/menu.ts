import type { MenuFormValues } from "./../../pages/Admin/MenuFormPage/MenuFormPage";
import client from "../client"

export const getMenuFormValues = async <T>() => {
    return await client.get<T>("/menu/form-values");
}

export const addMenuRequest = async (values: MenuFormValues) => {
    return await client.post("/menu/add", values);
}