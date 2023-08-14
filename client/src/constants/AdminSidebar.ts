import { IconType } from "react-icons";
import {
  AiOutlineUserAdd,
  AiOutlineUser,
  AiFillDashboard,
} from "react-icons/ai";
import { MdOutlineFastfood } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { RiReservedLine, RiUser2Fill } from "react-icons/ri";
export interface AdminSidebarProps {
  title: string;
  childrens: {
    title: string;
    link: string;
    name: string;
    Icon: IconType;
  }[];
}

export const adminSidebarItems: AdminSidebarProps[] = [
  {
    title: "خانه",
    childrens: [
      {
        title: "داشبورد",
        link: "/admin/dashboard",
        name: "dashboard",
        Icon: AiFillDashboard,
      },
    ],
  },
  {
    title: "دانشجو",
    childrens: [
      {
        title: "اضافه کردن دانشجو",
        link: "/admin/add-student",
        name: "add-student",
        Icon: AiOutlineUserAdd,
      },
      {
        title: "مدیریت دانشجو",
        link: "/admin/manage-student",
        name: "manage-student",
        Icon: AiOutlineUser,
      },
    ],
  },
  {
    title: "غذا",
    childrens: [
      {
        title: "اضافه کردن غذای جدید",
        link: "/admin/add-meal",
        name: "add-meal",
        Icon: MdOutlineFastfood,
      },
      {
        title: "مدیریت غذاها",
        link: "/admin/manage-meals",
        name: "manage-meals",
        Icon: MdOutlineFastfood,
      },
    ],
  },
  {
    title: "غذای اضافه",
    childrens: [
      {
        title: "اضافه کردن غذای اضافه جدید",
        link: "/admin/add-extra-meal",
        name: "add-extra-meal",
        Icon: MdOutlineFastfood,
      },
      {
        title: "مدیریت غذاهای اضافه",
        link: "/admin/manage-extra-meals",
        name: "manage-extra-meals",
        Icon: MdOutlineFastfood,
      },
    ],
  },
  {
    title: "وقت غذاها",
    childrens: [
      {
        title: "اضافه کردن وقت غذا",
        link: "/admin/add-mealTime",
        name: "add-mealTime",
        Icon: BiFoodMenu,
      },
      {
        title: "مدیریت وقت غذاها",
        link: "/admin/manage-mealTimes",
        name: "manage-mealTimes",
        Icon: BiFoodMenu,
      },
    ],
  },
  {
    title: "منو",
    childrens: [
      {
        title: "اضافه کردن آیتم منو",
        link: "/admin/add-menu",
        name: "add-menu",
        Icon: RiReservedLine,
      },
      {
        title: "مشاهده منو",
        link: "/admin/manage-menu",
        name: "manage-menu",
        Icon: RiReservedLine,
      },
    ],
  },
  {
    title: "حساب",
    childrens: [
      {
        title: "خروج",
        link: "/logout",
        name: "manage-menu",
        Icon: RiUser2Fill,
      },
    ],
  },
];
