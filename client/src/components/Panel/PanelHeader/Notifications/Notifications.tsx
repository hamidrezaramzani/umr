import {
  HStack,
  Badge,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import { BiBell } from "react-icons/bi";
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
      console.log("Notification Request");
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
      <Box mx="2"></Box>
      <Menu>
        <MenuButton>
          <Badge ml="1" fontSize="0.8em" colorScheme="red">
            {notifications?.length}
          </Badge>
          <BiBell fontSize="28" color="#fff" />
        </MenuButton>
        <Portal>
          <MenuList zIndex={999999}>
            {notifications?.map((notification) => (
              <MenuItem
                onClick={() => handleSeenNotification(notification._id)}
              >
                {notification.message}
              </MenuItem>
            ))}
          </MenuList>
        </Portal>
      </Menu>
    </HStack>
  );
};
export default Notifications;
