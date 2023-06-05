import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Image,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import AdminDashboardContainer from "../../../components/Admin/AdminDashboardContainer/AdminDashboardContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { wordBook } from "../../../helpers/wordBook";
import FormErrorMessage from "../../../components/FormErrorMessage/FormErrorMessage";
import { SUPPORTED_IMAGES } from "../../../constants/general";
import { toast } from "react-toastify";
import {
  addMealRequest,
  editMealRequest,
  getSingleMealRequest,
} from "../../../api/meals/meals";
import { useEffect, useState } from "react";
import { getImageAddress } from "../../../helpers/getImageAddress";
export interface MealFormValues {
  name: string;
  image: FileList | null;
  price: string;
}
const MealFormPage = () => {
  const { mealId } = useParams();
  const [image, setImage] = useState<string>("");
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    image: Yup.mixed()
      .nullable()
      .test("fileType", "", function (value: any) {
        if (!mealId && !value.length) {
          return this.createError({
            path: "image",
            message: wordBook.format(
              wordBook.fields.addMeal.image.fa,
              wordBook.messages.validation.required.fa,
            ),
          });
        }

        if (
          value &&
          value.length &&
          !SUPPORTED_IMAGES.includes(value[0].type)
        ) {
          return this.createError({
            path: "image",
            message: "فرمت فایل تنها میبایست عکس باشد(png/jpeg)",
          });
        }
        return true;
      }),
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
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<MealFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      image: null,
      price: "",
    },
  });

  useEffect(() => {
    const fetchSingleMeal = async () => {
      try {
        const {
          data: { image, name, price },
        } = await getSingleMealRequest(mealId);
        setImage(image);
        setValue("name", name);
        setValue("price", price);
      } catch (error) {
        toast.error("مشکلی در سرور وجود دارد مجدد امتحان کنید");
      }
    };

    if (mealId) {
      fetchSingleMeal();
    }
  }, []);

  console.log(errors);
  const [loading, setLoading] = useState<boolean>();
  const handleSubmitForm = async (values: MealFormValues) => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append("image", values.image ? (values.image as FileList)[0] : "");
      body.append("name", values.name);
      body.append("price", values.price);

      if (mealId) {
        body.append("id", mealId);
        await editMealRequest(body, mealId);
        toast.success("ویرایش غذا با موفقیت انجام شد");
      } else {
        await addMealRequest(body);
        toast.success("اضافه کردن غذا با موفقیت انجام شد");
      }
      navigate("/admin/manage-meals");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("خطایی در سرور پیش آمده مجدد امتحان کنید");
    }
  };

  console.log(getImageAddress(image));

  return (
    <AdminDashboardContainer
      title={mealId ? "ویرایش غذای جدید" : "اضافه کردن غذای جدید"}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box>
          {mealId && image.length ? (
            <Image
              width="50%"
              mb="3"
              rounded="base"
              crossOrigin="anonymous"
              src={getImageAddress(image)}
            />
          ) : (
            <></>
          )}
        </Box>
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
