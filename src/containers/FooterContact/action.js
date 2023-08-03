import { SAVE_CONTACT, SHOW_CONTACT_POPUP } from "./constants";
export function savecontactform(savecdata) {
  console.log("savecdata..", savecdata)
  return {
    type: SAVE_CONTACT,
    savecdata
  };
}
export function contactpopup(popupsave) {
  return {
    type: SHOW_CONTACT_POPUP,
    popupsave
  }
}