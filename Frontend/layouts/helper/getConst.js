import CryptoJS from "crypto-js";
import AddStudent from "@layouts/comman/student/AddStudent";
import { DELETE_STUDENT_ROUTE, SERVER_CRYPTO } from "@layouts/lib/constant";

let ROUTE;
export let getRoutes = (tableType) => {
  switch (tableType) {
    case "student":
      ROUTE = DELETE_STUDENT_ROUTE;
      break;
    default:
      ROUTE = null;
  }

  return ROUTE;
};

export let getModal = (tableType) => {
  switch (tableType) {
    case "student":
      return AddStudent;
  }
};

// export let viewModal = (tableType) => {
//   switch (tableType) {
//     case "documents":
//       return ViewDocumentModal;
//   }
// };

// export let PrintCompo = (tableType) => {
//   switch (tableType) {
//     case "documents":
//       return Print;
//   }
// };

// export let downloadCompo = (tableType) => {
//   switch (tableType) {
//     case "documents":
//       return Download;
//   }
// };

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear(); // YYYY
  return `${day}/${month}/${year}`;
}

export const encrypt = (text) => {
  const ciphertext = CryptoJS.AES.encrypt(
    text.toString(),
    SERVER_CRYPTO,
  ).toString();
  return encodeURIComponent(ciphertext);
};

export const decrypt = (encryptedText) => {
  const decodedText = decodeURIComponent(encryptedText);
  const bytes = CryptoJS.AES.decrypt(decodedText, SERVER_CRYPTO);
  return bytes.toString(CryptoJS.enc.Utf8);
};
