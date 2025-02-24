import { format } from "date-fns";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  //UTC para evitar problemas de fuso horário
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

// Utils para lidar com número de celulares no padrão brasileiro
export const formatPhone = (phone: string): string => {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};
