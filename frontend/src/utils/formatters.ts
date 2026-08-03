export const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);

export const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN");

export const formatDateTime = (date: string) =>
    new Date(date).toLocaleString("en-IN");