import { format } from "date-fns";

// Utils para lidar com datas no padrão brasileiro
export const formatDate = (date: string): string => {
  return format(new Date(date), "dd/MM/yyyy");
};

// Utils para lidar com número de celulares no padrão brasileiro
export const formatPhone = (phone: string): string => {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};
