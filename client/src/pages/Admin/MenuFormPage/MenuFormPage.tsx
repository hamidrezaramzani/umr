import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import AdminDashboardContainer from "../../../components/Admin/AdminDashboardContainer/AdminDashboardContainer";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useEffect, useState } from "react";
import { IMeal } from "../ManageMeals/ManageMealsPage";
import { IMealTime } from "../ManageMealTimes/ManageMealTimesForm";
import { IExtraMeal } from "../ManageExtraMeals/ManageExtraMeals";
import { toast } from "react-toastify";
import { addMenuRequest, getMenuFormValues } from "../../../api/menu/menu";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { wordBook } from "../../../helpers/wordBook";
import FormErrorMessage from "../../../components/FormErrorMessage/FormErrorMessage";
import { convertPersianNumberToEnglishNumber } from "../../../helpers/convertPersianNumberToEnglishNumber";
import { useNavigate } from "react-router";
export interface MenuFormValues {
  reservationDateRange: string[];
  date: string;
  meal: string;
  mealTimes: string;
  extraMeals: string[];
}
interface IMenuFormValues {
  meals?: IMeal[];
  mealTimes?: IMealTime[];
  extraMeals?: IExtraMeal[];
}
const MenuFormPage = () => {
  const navigate = useNavigate();
  const [{ mealTimes, extraMeals, meals }, setFormValues] =
    useState<IMenuFormValues>({});
  const [loading, setLoading] = useState(false);
  const schema = Yup.object().shape({
    reservationDateRange: Yup.array(Yup.string()).required(
      wordBook.format(
        wordBook.fields.menu.reservationDateRange.fa,
        wordBook.messages.validation.required.fa,
      ),
    ),
    date: Yup.string().required(
      wordBook.format(
        wordBook.fields.menu.date.fa,
        wordBook.messages.validation.required.fa,
      ),
    ),
    meal: Yup.string().required(
      wordBook.format(
        wordBook.fields.menu.meal.fa,
        wordBook.messages.validation.required.fa,
      ),
    ),
    mealTimes: Yup.string().required(
      wordBook.format(
        wordBook.fields.menu.mealTimes.fa,
        wordBook.messages.validation.required.fa,
      ),
    ),
    extraMeals: Yup.array(Yup.string()).required(
      wordBook.format(
        wordBook.fields.menu.extraMeal.fa,
        wordBook.messages.validation.required.fa,
      ),
    ),
  });
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<MenuFormValues>({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const fetchFormValues = async () => {
      try {
        const {
          data: { mealTimes, extraMeals, meals },
        } = await getMenuFormValues<IMenuFormValues>();
        setFormValues({ mealTimes, meals, extraMeals });
      } catch (error) {
        toast.error("مشکلی در سرور وجود دارد. لطفا به پشتیبانی اطلاع دهید");
      }
    };

    fetchFormValues();
  }, []);

  const handleSubmitForm = async (values: MenuFormValues) => {
    try {
      setLoading(true);
      await addMenuRequest(values);
      toast.success("آیتم منو با موفقیت ثبت شد");
      navigate("/admin/manage-menu");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("مشکلی در ثبت این آیتم از منو وجود دارد");
    }
  };

  return (
    <AdminDashboardContainer title="اضافه کردن آیتم منو">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <FormControl mb="3">
          <FormLabel>دامنه مجاز رزرو</FormLabel>
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
            range
            calendarPosition="bottom-center"
            calendar={persian}
            locale={persian_fa}
            onChange={(datesArray: DateObject | DateObject[] | null) => {
              const [start, end] = convertPersianNumberToEnglishNumber(
                String(datesArray?.toString()),
              ).split(",");

              setValue("reservationDateRange", [start, end]);
            }}
          />
          <FormErrorMessage>
            {errors.reservationDateRange?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb="3">
          <FormLabel>تاریخ</FormLabel>
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
                "date",
                convertPersianNumberToEnglishNumber(String(value?.toString())),
              );
            }}
          />
          <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
        </FormControl>
        <Controller
          control={control}
          name="meal"
          render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error },
          }) => (
            <FormControl mb="3">
              <FormLabel>غذا</FormLabel>
              <RadioGroup
                colorScheme="blue"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
              >
                <VStack
                  gap="3"
                  spacing={[1, 5]}
                  justify="start"
                  alignItems="start"
                >
                  {meals?.map((meal) => (
                    <Radio key={meal._id} value={meal._id}>
                      {meal.name}
                    </Radio>
                  ))}
                </VStack>
              </RadioGroup>
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <FormControl mb="3">
          <FormLabel>غذای اضافه</FormLabel>
          <CheckboxGroup
            colorScheme="blue"
            {...register("extraMeals")}
            onChange={(value: string[]) => {
              setValue("extraMeals", value);
            }}
          >
            <VStack gap="3" spacing={[1, 5]} justify="start" alignItems="start">
              {extraMeals?.map((extraMeal) => (
                <Checkbox value={extraMeal._id}>{extraMeal.title}</Checkbox>
              ))}
            </VStack>
          </CheckboxGroup>
          <FormErrorMessage>{errors.extraMeals?.message}</FormErrorMessage>
        </FormControl>
        <Controller
          control={control}
          name="mealTimes"
          render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error },
          }) => (
            <FormControl mb="3">
              <FormLabel>وقت غذا</FormLabel>
              <RadioGroup
                name={name}
                colorScheme="blue"
                value={value}
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched
              >
                <VStack
                  gap="3"
                  spacing={[1, 5]}
                  justify="start"
                  alignItems="start"
                >
                  {mealTimes?.map((mealTime) => (
                    <Radio key={mealTime._id} value={mealTime._id}>
                      {mealTime.title}
                    </Radio>
                  ))}
                </VStack>
              </RadioGroup>
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Button
          isLoading={loading}
          type="submit"
          width="100%"
          colorScheme="blue"
          mt="3"
        >
          ثبت
        </Button>
      </form>
    </AdminDashboardContainer>
  );
};

export default MenuFormPage;
