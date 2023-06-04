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
    }
]

