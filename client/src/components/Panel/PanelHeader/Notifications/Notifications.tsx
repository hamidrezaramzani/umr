import {
  HStack,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { BiBell, BiCheck } from "react-icons/bi";
import { IUser } from "../../../../pages/Panel/PanelPage";
import { useEffect, useState } from "react";
import {
  getUserNotificationsRequest,
  seenNotificationRequest,
} from "../../../../api/notifications/notification";
import { wordBook } from "../../../../helpers/wordBook";
import { toast } from "react-toastify";

export interface INotification {
  _id: string;
  user: IUser;
  message: string;
  seen: boolean;
}
const Notifications = () => {
  const [notifications, setNotifications] = useState<
    INotification[] | undefined
  >([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      toast.promise(() => getUserNotificationsRequest<INotification[]>(), {
        pending: wordBook.common.pending.fa,
        error: wordBook.messages.errors.serverInternalError.fa,
        success: {
          render: ({ data }) => {
            setNotifications(data?.data);
            return wordBook.messages.success.notification.readSuccessfully.fa;
          },
        },
      });
    };

    fetchNotifications();
  }, []);

  const handleSeenNotification = (notificationId: string) => {
    toast.promise(
      () => seenNotificationRequest<INotification>(notificationId),
      {
        pending: wordBook.common.pending.fa,
        error: wordBook.messages.errors.serverInternalError.fa,
        success: {
          render: () => {
            setNotifications(
              notifications?.filter(
                (notification) => notification._id !== notificationId,
              ),
            );
            return wordBook.messages.success.notification.seenNotification.fa;
          },
        },
      },
    );
  };
  return (
    <HStack>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<BiBell fontSize={35} />}
          size="md"
          variant="ghost"
          colorScheme="whiteAlpha"
        />
        <MenuList minWidth="220px">
          <Box p={2} fontSize="sm">
            <Text fontWeight="bold" mb={2}>
              اطلاع رسانی ها
            </Text>
            {notifications?.length === 0 ? (
              <Text color="gray.500">اطلاع رسانی جدیدی وجود ندارد</Text>
            ) : (
              notifications?.map((notification) => (
                <MenuItem key={notification.message} fontSize="sm">
                  {notification.message}{" "}
                  <Button
                    size="sm"
                    colorScheme="blue"
                    ml="10px"
                    onClick={() => handleSeenNotification(notification._id)}
                  >
                    <BiCheck fontSize={23} color="#fff" />
                  </Button>
                </MenuItem>
              ))
            )}
          </Box>
        </MenuList>
      </Menu>
    </HStack>
  );
};
export default Notifications;
