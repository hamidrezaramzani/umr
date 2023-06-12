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
        }
    },
    format: (name: string, message: string) => {
        return message.replace("%s", name);
    }
};