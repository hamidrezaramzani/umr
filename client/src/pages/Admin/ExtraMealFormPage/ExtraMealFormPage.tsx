import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import AdminDashboardContainer from "../../../components/Admin/AdminDashboardContainer/AdminDashboardContainer";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { wordBook } from "../../../helpers/wordBook";
import { toast } from "react-toastify";
import FormErrorMessage from "../../../components/FormErrorMessage/FormErrorMessage";
import { addExtraMealRequest } from "../../../api/extraMeal/extraMeal";
import { useNavigate } from "react-router";
import { useState } from "react";

export interface ExtraFoodFormValues {
  title: string;
}
const ExtraMealFormPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const schema = Yup.object().shape({
    title: Yup.string().required(
      wordBook.format(
        wordBook.fields.addExtraMeal.title.fa,
        wordBook.messages.validation.required.fa,
      ),
    ),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ExtraFoodFormValues>({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (values: ExtraFoodFormValues) => {
    try {
      setLoading(true);
      await addExtraMealRequest(values);
      toast.success("غذای اضافه با موفقیت اضافه شد.");
      navigate("/admin/manage-extra-meals");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("مشکلی در سرور وجود دارد.");
    }
  };
  return (
    <AdminDashboardContainer title="افزودن غذای اضافه">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <FormControl>
          <FormLabel>عنوان</FormLabel>
          <Input type="text" {...register("title")} />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
        <Button
          isLoading={loading}
          width="100%"
          colorScheme="blue"
          mt="3"
          type="submit"
        >
          ثبت
        </Button>
      </form>
    </AdminDashboardContainer>
  );
};

export default ExtraMealFormPage;
