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
import {
  deleteStudentRequest,
  getStudentsRequest,
} from "../../../api/students/students";
import AdminDashboardContainer from "../../../components/Admin/AdminDashboardContainer/AdminDashboardContainer";
import { HiOutlineTrash } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
export interface IStudent {
  _id: string;
  fullName: string;
  meliCode: string;
  studentNumber: string;
  password: string;
  birthday: string;
}
const ManageStudentsPage = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState<string>("");
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data: students } = await getStudentsRequest<IStudent[]>();
        setStudents(students);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("خطایی پیش اومده. مجدد امتحان کنید");
      }
    };
    setLoading(true);
    fetchStudents();
  }, []);

  const handleRemoveStudent = async () => {
    onClose();
    if (id) {
      try {
        setLoading(true);
        await deleteStudentRequest(id);
        setStudents((prevStudents) => {
          return prevStudents.filter((student) => student._id !== id);
        });
        toast.success("دانشحو با موفقیت حذف شد");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("خطایی پیش آمده. لطفا بعدا مجدد امتحان کنید");
      }
    } else {
      toast.error("خطایی پیش آمده. لطفا بعدا مجدد امتحان کنید");
    }
    console.log(id);
  };
  return (
    <AdminDashboardContainer title="مدیریت دانشجوها">
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleRemoveStudent}
        type="delete"
        title="حذف دانشجو"
        description="آیا واقعا میخواهید این دانشجو را حذف کنید"
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
                <Th>نام و نام خانوادگی</Th>
                <Th>کد ملی</Th>
                <Th>شماره دانشجویی</Th>
                <Th>تاریخ تولد</Th>
                <Th>مدیریت</Th>
              </Tr>
            </Thead>
            <Tbody>
              {students.map((student) => (
                <Tr>
                  <Td>{student.fullName}</Td>
                  <Td>{student.meliCode}</Td>
                  <Td>{student.studentNumber}</Td>
                  <Td>{student.birthday}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="red"
                      ml="5"
                      onClick={() => {
                        setId(student._id);
                        onOpen();
                      }}
                    >
                      <HiOutlineTrash fontSize="17" />
                    </Button>
                    &nbsp;&nbsp;
                    <Button size="sm" colorScheme="yellow">
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

export default ManageStudentsPage;
