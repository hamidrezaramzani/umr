export const convertPersianNumberToEnglishNumber = (persianNumber: string) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    let englishNumber = "";
    for (let i = 0; i < persianNumber.length; i++) {
        const digit = persianDigits.indexOf(persianNumber[i]);
        if (digit !== -1) {
            englishNumber += englishDigits[digit];
        } else {
            englishNumber += persianNumber[i];
        }
    }
    return englishNumber;
}