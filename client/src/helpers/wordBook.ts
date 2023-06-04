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