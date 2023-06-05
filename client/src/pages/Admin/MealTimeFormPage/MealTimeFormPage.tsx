import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import AdminDashboardContainer from "../../../components/Admin/AdminDashboardContainer/AdminDashboardContainer";
import { wordBook } from "../../../helpers/wordBook";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  addMealTimeRequest,
  editMealTimeRequest,
  getSingleMealTimeRequest,
} from "../../../api/mealTimes/mealTimes";
import FormErrorMessage from "../../../components/FormErrorMessage/FormErrorMessage";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
export interface MealTimeFormValues {
  title: string;
}
const MealTimeFormPage = () => {
  const { mealTimeId } = useParams();
  const [loading, setLoading] = useState(false);
  const schema = Yup.object().shape({
    title: Yup.string().required(
      wordBook.format(
        wordBook.fields.addMealTime.title.fa,
        wordBook.messages.validation.required.fa,
      ),
    ),
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MealTimeFormValues>({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchSingleMealTime = async () => {
      try {
        const {
          data: { title },
        } = await getSingleMealTimeRequest(mealTimeId);
        console.log(title);
        
        setValue("title", title);
      } catch (error) {
        toast.error("مشکلی در سمت سرور وجود دارد مجدد امتحان کنید");
      }
    };
    if (mealTimeId) {
      fetchSingleMealTime();
    }
  }, []);

  const handleSubmitForm = async (values: MealTimeFormValues) => {
    try {
      setLoading(true);
      if (mealTimeId) {
        await editMealTimeRequest(values, mealTimeId);
        toast.success("وقت غذا با موفقیت ویرایش شد");
      } else {
        await addMealTimeRequest(values);
        toast.success("وقت غذا با موفقیت اضافه شد");
      }
      setLoading(false);
      navigate("/admin/manage-mealTimes");
    } catch (error) {
      setLoading(false);
      toast.error("خطایی از سمت سرور پیش آمده است مجدد امتحان کنید");
    }
  };
  return (
    <AdminDashboardContainer title="اضافه کردن وقت غذا">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <FormControl mb="3">
          <FormLabel>{wordBook.fields.addMealTime.title.fa}</FormLabel>
          <Input type="text" {...register("title")} />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
        <Button
          isLoading={loading}
          type="submit"
          width="full"
          colorScheme="blue"
        >
          {mealTimeId ? "ویرایش" : "ثبت"}
        </Button>
      </form>
    </AdminDashboardContainer>
  );
};

export default MealTimeFormPage;
