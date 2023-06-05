import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import AdminDashboardContainer from "../../../components/Admin/AdminDashboardContainer/AdminDashboardContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { wordBook } from "../../../helpers/wordBook";
import FormErrorMessage from "../../../components/FormErrorMessage/FormErrorMessage";
import { SUPPORTED_IMAGES } from "../../../constants/general";
import { toast } from "react-toastify";
import { addMealRequest } from "../../../api/meals/meals";
import { useState } from "react";
export interface MealFormValues {
  name: string;
  image: FileList;
  price: string;
}
const MealFormPage = () => {
  const { mealId } = useParams();
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    image: Yup.mixed()
      .test("fileType", "", function (value: any) {
        if (!value.length) {
          return this.createError({
            path: "image",
            message: wordBook.format(
              wordBook.fields.addMeal.image.fa,
              wordBook.messages.validation.required.fa,
            ),
          });
        }
        if (!SUPPORTED_IMAGES.includes(value[0].type)) {
          return this.createError({
            path: "image",
            message: "فرمت فایل تنها میبایست عکس باشد(png/jpeg)",
          });
        }
        return true;
      })
      .required(
        wordBook.format(
          wordBook.fields.addMeal.image.fa,
          wordBook.messages.validation.required.fa,
        ),
      ),
    name: Yup.string().required(
      wordBook.format(
        wordBook.fields.addMeal.name.fa,
        wordBook.messages.validation.required.fa,
      ),
    ),
    price: Yup.string().required(
      wordBook.format(
        wordBook.fields.addMeal.price.fa,
        wordBook.messages.validation.required.fa,
      ),
    ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MealFormValues>({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState<boolean>();
  const handleSubmitForm = async (values: MealFormValues) => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append("image", values.image[0]);
      body.append("name", values.name);
      body.append("price", values.price);

      await addMealRequest(body);
      toast.success("اضافه کردن غذا با موفقیت انجام شد");

      navigate("/admin/manage-meals");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("خطایی در ثبت غذای جدید پیش آمده مجدد امتحان کنید");
    }
  };
  return (
    <AdminDashboardContainer title="اضافه کردن غذای جدید">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box></Box>
        <FormControl mb="3">
          <FormLabel>عکس غذا</FormLabel>
          <Input type="file" {...register("image")} accept="images/*" />
          <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb="3">
          <FormLabel>نام غذا</FormLabel>
          <Input type="text" {...register("name")} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb="3">
          <FormLabel>قیمت غذا</FormLabel>
          <Input type="number" {...register("price")} />
          <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
        </FormControl>

        <Button isLoading={loading} type="submit" w="full" colorScheme="blue">
          {mealId ? "ویرایش" : "ثبت"}
        </Button>
      </form>
    </AdminDashboardContainer>
  );
};

export default MealFormPage;
