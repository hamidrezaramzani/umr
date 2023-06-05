import { IconType } from "react-icons";
import { AiOutlineUserAdd, AiOutlineUser } from "react-icons/ai"
import { MdOutlineFastfood } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
export interface AdminSidebarProps {
    title: string;
    childrens: {
        title: string;
        link: string;
        name: string;
        Icon: IconType
    }[]
}

export const adminSidebarItems: AdminSidebarProps[] = [
    {
        title: "دانشجو",
        childrens: [
            {
                title: "اضافه کردن دانشجو",
                link: "/admin/add-student",
                name: "add-student",
                Icon: AiOutlineUserAdd
            },
            {
                title: "مدیریت دانشجو",
                link: "/admin/manage-student",
                name: "manage-student",
                Icon: AiOutlineUser
            },
        ]
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
                Icon: MdOutlineFastfood
            },
        ]
    },
    {
        title: "وقت غذاها",
        childrens: [
            {
                title: "اضافه کردن وقت غذا",
                link: "/admin/add-mealTime",
                name: "add-mealTime",
                Icon: BiFoodMenu
            },
            {
                title: "مدیریت وقت غذاها",
                link: "/admin/manage-mealTimes",
                name: "manage-mealTimes",
                Icon: BiFoodMenu
            },
        ]
    }
]

