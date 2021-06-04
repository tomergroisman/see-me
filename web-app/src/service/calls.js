import axios from "axios";
import { mapValues } from "./shared";

const HTTPSHANDLER = "https://vast-bayou-60975.herokuapp.com/";

const baseURL = HTTPSHANDLER + "http://18.133.245.223:3000";

export async function submitReport(reportValue, message) {
  const classToken = localStorage.getItem('classToken')
  if (!classToken) return;

  const url = `${baseURL}/report/${classToken}`;
  const mappedValue = mapValues(reportValue);
  const payload = { report: mappedValue, message };

  await axios.post(url, payload);
}

export async function getSchools() {
  const url = baseURL + "/api/school";
  const { data: schoolsList } = await axios.get(url);
  return schoolsList;
}
export async function getClasses(SchoolID) {
  const url = baseURL + `/api/school/${SchoolID}`;
  const { data: { classes } } = await axios.get(url);
  return classes;
}
export async function submitLogin(classID) {
  const url = baseURL + `/api/student`;
  const { data: userTokenObject } = await axios.post(url, { class_id: classID });
  const { class_ref: classToken, id: userToken } = userTokenObject
  return { classToken, userToken };
}
