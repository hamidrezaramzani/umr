import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Spinner,
  Button,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminDashboardContainer from "../../../components/Admin/AdminDashboardContainer/AdminDashboardContainer";
import { HiOutlineTrash } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { useNavigate } from "react-router";
import { deleteMealRequest, getMealsRequest } from "../../../api/meals/meals";
import { getImageAddress } from "../../../helpers/getImageAddress";
export interface IMeal {
  _id: string;
  name: string;
  image: string;
  price: string;
}
const ManageMealsPage = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data: meals } = await getMealsRequest<IMeal[]>();
        setMeals(meals);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("خطایی پیش اومده. مجدد امتحان کنید");
      }
    };
    setLoading(true);
    fetchMeals();
  }, []);

  const handleRemoveMeal = async () => {
    onClose();
    if (id) {
      try {
        setLoading(true);
        await deleteMealRequest(id);
        setMeals((prevMeals) => {
          return prevMeals.filter((meal) => meal._id !== id);
        });
        toast.success("غذا با موفقیت حذف شد");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("خطایی پیش آمده. لطفا بعدا مجدد امتحان کنید");
      }
    } else {
      toast.error("خطایی پیش آمده. لطفا بعدا مجدد امتحان کنید");
    }
  };

  const handleEditMeal = (id: string) => {
    navigate(`/admin/edit-meal/${id}`);
  };
  return (
    <AdminDashboardContainer title="مدیریت غذاها">
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleRemoveMeal}
        type="delete"
        title="حذف غذا"
        description="آیا واقعا میخواهید این غذا را حذف کنید"
      />
      {loading ? (
        <HStack
          height="400px"
          justify="center"
          alignItems="center"
          width="full"
        >
          <Spinner size="lg" />
        </HStack>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>نام</Th>
                <Th>قیمت</Th>
                <Th>عکس</Th>
                <Th>مدیریت</Th>
              </Tr>
            </Thead>
            <Tbody>
              {meals.map((meal) => (
                <Tr>
                  <Td>{meal.name}</Td>
                  <Td>{meal.price}</Td>
                  <Td>
                    <Link
                      color="blue"
                      href={getImageAddress(meal.image)}
                      target="_blank"
                    >
                      مشاهده
                    </Link>
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="red"
                      ml="5"
                      onClick={() => {
                        setId(meal._id);
                        onOpen();
                      }}
                    >
                      <HiOutlineTrash fontSize="17" />
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      size="sm"
                      colorScheme="yellow"
                      onClick={() => {
                        handleEditMeal(meal._id);
                      }}
                    >
                      <FiEdit fontSize="17" />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </AdminDashboardContainer>
  );
};

export default ManageMealsPage;
