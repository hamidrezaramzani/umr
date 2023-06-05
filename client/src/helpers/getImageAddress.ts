export const getImageAddress = (image: string) => {
    const host = import.meta.env.VITE_HOST_URL;
    return `${host}uploads/${image}`
}