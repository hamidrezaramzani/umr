import { AddStudentFormValues } from "../../pages/Admin/AddStudent/AddStudentPage";
import client from "../client";

export const addStudentRequest = async (data: AddStudentFormValues) => {
    return await client.post("/student/add", data);
};

export const getStudentsRequest = async <T>() => {
    return await client.get<T>("/student/all");
};


export const deleteStudentRequest = async (id: string) => {
    return await client.delete(`/student/delete/${id}`);
};

