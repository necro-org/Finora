import dayjs, { Dayjs } from "dayjs";

export function formatMoney(value: number | null | undefined) {
  if (!value) return "";

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatCurrency(value: number | null | undefined) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value ?? 0);
}

export function formatDateToShow(value: string | null | undefined) {
  if (!value) return "";
  return dayjs(value, "YYYY-MM-DD").format("DD/MM/YYYY");
}

export function formatDate(value: Dayjs | null) {
  if (!value) return null;
  return value.format("YYYY-MM-DD");
}

export function todayDate() {
  return formatDate(dayjs()) as string;
}

export function startOfMonth() {
  return formatDate(dayjs().startOf("month")) as string;
}

export function endOfMonth() {
  return formatDate(dayjs().endOf("month")) as string;
}

export function formatToDayjs(value: string | null) {
  if (!value) return null;
  return dayjs(value);
}
