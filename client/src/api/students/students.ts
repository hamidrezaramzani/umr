import { AddStudentFormValues } from "../../pages/Admin/StudentFormPage/StudentFormPage";
import client from "../client";

export const addStudentRequest = async (values: AddStudentFormValues) => {
    return await client.post("/student/add", values);
};

export const getStudentsRequest = async <T>() => {
    return await client.get<T>("/student/all");
};


export const deleteStudentRequest = async (id: string) => {
    return await client.delete(`/student/delete/${id}`);
};


export const fetchSingleStudentRequest = async (id?: string) => {
    return await client.get(`/student/one/${id}`);
};

export const editStudentRequest = async (values: AddStudentFormValues, userId: string) => {
    return await client.put(`/student/edit/${userId}`, values);
}

export const addBalanceRequest = async (value: number) => {
    return await client.get(`/student/add-balance/${value}`);
}
