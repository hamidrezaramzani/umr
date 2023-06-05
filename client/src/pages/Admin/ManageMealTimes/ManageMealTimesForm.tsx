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
  deleteMealTimeRequest,
  getMealTimesRequest,
} from "../../../api/mealTimes/mealTimes";
export interface IMealTime {
  _id: string;
  title: string;
}
const ManageMealTimes = () => {
  const [mealTimes, setMealTimes] = useState<IMealTime[]>([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMealTimes = async () => {
      try {
        const { data: mealTimes } = await getMealTimesRequest<IMealTime[]>();
        setMealTimes(mealTimes);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("خطایی پیش آمده است لطفا مجدد امتحان کنید");
      }
    };
    setLoading(true);
    fetchMealTimes();
  }, []);

  const handleRemoveMealTime = async () => {
    onClose();
    if (id) {
      try {
        setLoading(true);
        await deleteMealTimeRequest(id);
        setMealTimes((prevMealTimes) => {
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

  const handleEditMealTime = (id: string) => {
    navigate(`/admin/edit-mealTime/${id}`);
  };
  return (
    <AdminDashboardContainer title="مدیریت وقت های غذا">
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleRemoveMealTime}
        type="delete"
        title="حذف وقت غذا"
        description="آیا واقعا میخواهید این وقت غذا را حذف کنید"
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
                        handleEditMealTime(mealTime._id);
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

export default ManageMealTimes;
