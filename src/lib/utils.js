import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDatetime(dateValue) {
  const dateObj = new Date(dateValue);
  
  const date = dateObj.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeZone: 'America/Sao_Paulo'
  });
  
  const time = dateObj.toLocaleString('pt-BR', {
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo'
  });
  
  return `${date} às ${time}`;
}

export function validarCnpj(cnpj) {
  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  const digits = cnpj.substring(length);
  let add = 0;
  let pos = length - 7;
  for (let i = length; i >= 1; i--) {
    add += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = add % 11 < 2 ? 0 : 11 - (add % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  length += 1;
  numbers = cnpj.substring(0, length);
  add = 0;
  pos = length - 7;
  for (let i = length; i >= 1; i--) {
    add += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = add % 11 < 2 ? 0 : 11 - (add % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
}
