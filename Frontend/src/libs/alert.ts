import Swal, { type SweetAlertIcon } from "sweetalert2";

import { AxiosError, HttpStatusCode } from "axios";

interface ResponseData {
  status?: HttpStatusCode;
  title?: string;
  detail?: string | string[];
  errors?: Record<string, string[]>;
}

interface ExtractedError {
  title: string;
  messages: string[];
  icon: SweetAlertIcon;
}

const defaultTitle = "Oops...";
const defaultMessage = "Algo deu errado!";

function toMessages(data: ResponseData) {
  const details = Array.isArray(data.detail)
    ? data.detail
    : data.detail
      ? [data.detail]
      : [];

  const validationErrors = Object.values(data.errors ?? {}).flat();

  return [...details, ...validationErrors].filter(Boolean);
}

function extractError(err: unknown): ExtractedError {
  if (err instanceof AxiosError) {
    const data: ResponseData | undefined = err.response?.data;
    const status = data?.status ?? err.response?.status;
    const messages = data ? toMessages(data) : [];

    return {
      title: data?.title || defaultTitle,
      messages: messages.length > 0 ? messages : [defaultMessage],
      icon: status === HttpStatusCode.BadRequest ? "warning" : "error",
    };
  }

  if (err instanceof Error && err.message) {
    return { title: defaultTitle, messages: [err.message], icon: "error" };
  }

  return { title: defaultTitle, messages: [defaultMessage], icon: "error" };
}

function escapeHtml(value: string) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

function buildMessagesHtml(messages: string[]) {
  const style =
    "margin:0;font-size:1.1rem;font-weight:600;color:inherit;line-height:1.5";

  if (messages.length === 1) {
    return `<p style="${style}">${escapeHtml(messages[0])}</p>`;
  }

  const items = messages
    .map((message) => `<li>${escapeHtml(message)}</li>`)
    .join("");

  return `<ul style="${style};text-align:left;padding-left:1.25rem">${items}</ul>`;
}

export function fireError(err: unknown) {
  const { icon, title, messages } = extractError(err);

  Swal.fire({
    icon,
    title,
    html: buildMessagesHtml(messages),
    confirmButtonText: "Beleza!",
    showCloseButton: true,
  });
}

export function confirmDelete(onConfirm: () => Promise<void>) {
  Swal.fire({
    icon: "question",
    title: "Você realmente quer remover?",
    text: "As alterações não poderão ser desfeitas",
    showConfirmButton: true,
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: "Sim",
    confirmButtonColor: "red",
    cancelButtonText: "Não",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      await onConfirm();
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
}

export function confirmPassword(
  onConfirm: (password: string) => Promise<void>,
) {
  Swal.fire({
    icon: "question",
    title: "Você realmente quer remover?",
    text: "As alterações não poderão ser desfeitas, confirme digitando a sua senha",
    showConfirmButton: true,
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: "Sim",
    confirmButtonColor: "red",
    cancelButtonText: "Não",
    showLoaderOnConfirm: true,
    preConfirm: async (password: string) => {
      await onConfirm(password);
    },
    allowOutsideClick: () => !Swal.isLoading(),
    input: "password",
    inputPlaceholder: "Digite sua senha",
    inputAttributes: {
      autocapitalize: "off",
      autocorrect: "off",
    },
  });
}

export function confirmMessage(
  onClose: () => void,
  { title, text }: { title: string; text: string },
) {
  Swal.fire({
    icon: "success",
    title,
    text,
    showConfirmButton: true,
    confirmButtonText: "Beleza!",
    didClose: () => onClose(),
  });
}
