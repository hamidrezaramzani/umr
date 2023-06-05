import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import AdminDashboardContainer from "../../../components/Admin/AdminDashboardContainer/AdminDashboardContainer";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { wordBook } from "../../../helpers/wordBook";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { convertPersianNumberToEnglishNumber } from "../../../helpers/convertPersianNumberToEnglishNumber";
import FormErrorMessage from "../../../components/FormErrorMessage/FormErrorMessage";
import { toast } from "react-toastify";
import { addStudentRequest } from "../../../api/students/students";
import { useNavigate } from "react-router";
import { useState } from "react";
export interface AddStudentFormValues {
  fullName: string;
  meliCode: string;
  studentNumber: string;
  birthday: string;
}
const AddStudentPage = () => {
  const [loading, setLoading] = useState(false);
  const schema = Yup.object().shape({
    fullName: Yup.string().required(
      wordBook.format(
        wordBook.fields.addStudent.fullName.fa,
        wordBook.messages.validation.required.fa,
      ),
    ),
    meliCode: Yup.string().required(
      wordBook.format(
        wordBook.fields.addStudent.meliCode.fa,
        wordBook.messages.validation.required.fa,
      ),
    ),
    studentNumber: Yup.string().required(
      wordBook.format(
        wordBook.fields.addStudent.studentNumber.fa,
        wordBook.messages.validation.required.fa,
      ),
    ),
    birthday: Yup.string().required(
      wordBook.format(
        wordBook.fields.addStudent.birthday.fa,
        wordBook.messages.validation.required.fa,
      ),
    ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddStudentFormValues>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const handleSubmitForm = async (values: AddStudentFormValues) => {
    try {
      setLoading(true);
      await addStudentRequest(values);
      toast.success("اضافه کردن دانشجو با موفقیت انجام شد");
      navigate("/admin/manage-student");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("خطایی هنگام ورود به حساب رخ داده است. مجدد گزارش دهید");
    }
  };
  return (
    <AdminDashboardContainer title="اضافه کردن دانشجوی جدید">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <FormControl mt="3" mb="3">
          <FormLabel>{wordBook.fields.addStudent.fullName.fa}</FormLabel>
          <Input type="text" {...register("fullName")} name="fullName" />
          <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt="3" mb="3">
          <FormLabel>{wordBook.fields.addStudent.meliCode.fa}</FormLabel>
          <Input type="text" {...register("meliCode")} name="meliCode" />
          <FormErrorMessage>{errors.meliCode?.message}</FormErrorMessage>
          <Alert status="warning" mt="5" fontSize="md">
            <AlertIcon />
            به صورت پیشفرض کد ملی به عنوان رمز عبور دانشجو انتخاب خواهد شد
          </Alert>
        </FormControl>

        <FormControl mt="3" mb="3">
          <FormLabel>{wordBook.fields.addStudent.studentNumber.fa}</FormLabel>
          <Input
            type="text"
            {...register("studentNumber")}
            name="studentNumber"
          />
          <FormErrorMessage>{errors.studentNumber?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt="3" mb="3">
          <FormLabel>{wordBook.fields.addStudent.birthday.fa}</FormLabel>
          <DatePicker
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid #CBD5E0",
              height: "40px",
            }}
            containerStyle={{
              width: "100%",
            }}
            calendarPosition="bottom-center"
            calendar={persian}
            locale={persian_fa}
            onChange={(value) => {
              setValue(
                "birthday",
                convertPersianNumberToEnglishNumber(String(value?.toString())),
              );
            }}
          />
          <FormErrorMessage>{errors.birthday?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          isLoading={loading}
          width="full"
        >
          ثبت
        </Button>
      </form>
    </AdminDashboardContainer>
  );
};

export default AddStudentPage;
