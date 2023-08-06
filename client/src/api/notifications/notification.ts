import client from "../client";

export const getUserNotificationsRequest = async <T>() => {
  return await client.get<T>(`/notification/user`);
};

export const seenNotificationRequest = async <T>(notificationId: string) => {
  return await client.get<T>(`/notification/seen/${notificationId}`);
};
