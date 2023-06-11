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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminDashboardContainer from "../../../components/Admin/AdminDashboardContainer/AdminDashboardContainer";
import { HiOutlineTrash } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { useNavigate } from "react-router";
import {
  deleteExtraMealRequest,
  getExtraMealsRequest,
} from "../../../api/extraMeal/extraMeal";
export interface IExtraMeal {
  _id: string;
  title: string;
}
const ManageExtraMeals = () => {
  const [mealTimes, setExtraMeals] = useState<IExtraMeal[]>([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchExtraMeals = async () => {
      try {
        const { data: mealTimes } = await getExtraMealsRequest<IExtraMeal[]>();
        setExtraMeals(mealTimes);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("خطایی پیش آمده است لطفا مجدد امتحان کنید");
      }
    };
    setLoading(true);
    fetchExtraMeals();
  }, []);

  const handleRemoveMealTime = async () => {
    onClose();
    if (id) {
      try {
        setLoading(true);
        await deleteExtraMealRequest(id);
        setExtraMeals((prevMealTimes) => {
          return prevMealTimes.filter((mealTime) => mealTime._id !== id);
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

  const handleEditExtraMeal = (id: string) => {
    navigate(`/admin/edit-extraMeal/${id}`);
  };
  return (
    <AdminDashboardContainer title=" مدیریت غذاهای اضافه">
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleRemoveMealTime}
        type="delete"
        title="حذف غذای اضافه"
        description="آیا واقعا میخواهید این غذای اضافه را حذف کنید؟"
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
                <Th>عنوان</Th>
                <Th>مدیریت</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mealTimes.map((mealTime) => (
                <Tr>
                  <Td>{mealTime.title}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="red"
                      ml="5"
                      onClick={() => {
                        setId(mealTime._id);
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
                        handleEditExtraMeal(mealTime._id);
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

export default ManageExtraMeals;
