export interface AdminSidebarProps {
    title: string;
    childrens: {
        title: string;
        link: string;
        name: string;
    }[]
}

export const adminSidebarItems: AdminSidebarProps[] = [
    {
        title: "دانشجو",
        childrens: [
            {
                title: "اضافه کردن دانشجو",
                link: "/admin/add-student",
                name: "add-student"
            },
            {
                title: "مدیریت دانشجو",
                link: "/admin/manage-student",
                name: "manage-student"
            },
        ]
    },
    {
        title: "غذا",
        childrens: [
            {
                title: "اضافه کردن غذای جدید",
                link: "/admin/add-meal",
                name: "add-meal"
            },
            {
                title: "مدیریت غذاها",
                link: "/admin/manage-meals",
                name: "manage-meals"
            },
        ]
    }
]

