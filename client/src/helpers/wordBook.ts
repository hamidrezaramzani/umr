export const wordBook = {
    fields: {
        auth: {
            meliCode: {
                en: "Student Number",
                fa: "شماره دانشجویی"
            },
            password: {
                en: "Password",
                fa: "رمز عبور"
            }
        },
        addStudent: {
            fullName: {
                fa: "نام و نام خانوادگی",
                en: "Full name"
            },
            meliCode: {
                fa: "کد ملی",
                en: "Meli code"
            },
            studentNumber: {
                fa: "شماره دانشجویی",
                en: "Student Number"
            },
            birthday: {
                fa: "تاریخ تولد",
                en: "Birthday"
            }
        },
        addMeal: {
            name: {
                fa: "نام غذا",
                en: "Meal Name"
            },
            image: {
                fa: "تصویر غذا",
                en: "Meal Image"
            },
            price: {
                fa: "قیمت غذا",
                en: "Meal Price"
            }
        },
        addMealTime: {
            title: {
                fa: "عنوان",
                en: "Title"
            }
        },
        addExtraMeal: {
            title: {
                fa: "عنوان",
                en: "Title"
            }
        },
        menu: {
            reservationDateRange: {
                fa: "دامنه مجاز رزرو",
                en: "Reservation Date Range"
            },
            date: {
                fa: "تاریخ",
                en: "Date"
            },
            meal: {
                fa: "غذا",
                en: "meal"
            },
            extraMeal: {
                fa: "غذای اضافه", en: "Extra Meal"
            },
            mealTimes: {
                fa: "وقت غذا",
                en: "Meal Time"
            }
        }
    },
    messages: {
        validation: {
            required: {
                fa: "%s نمیتواند خالی باشد",
                en: "%s can not be empty"
            }
        },
        errors: {
            serverInternalError: {
                fa: "مشکلی در سرور وجود دارد. لطفا دوباره مجدد امتحان کنید",
                en: "we have an error on server, please try again"
            },
        }
    },
    format: (name: string, message: string) => {
        return message.replace("%s", name);
    }
};