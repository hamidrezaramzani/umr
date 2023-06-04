import { AddStudentFormValues } from "../../pages/Admin/AddStudent/AddStudentPage";
import client from "../client";

export const addStudentRequest = async (data: AddStudentFormValues) => {
    return await client.post("/student/add", data);
};