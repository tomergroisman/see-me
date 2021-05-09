import axios from "axios";
import { mapValues } from "./shared";

export async function submitReport(reportValue, message) {
  const url = "http://18.133.245.223:3000/report/6047c75db313be4c8829b7d7";
  const mappedValue = mapValues(reportValue);
  const payload = { report: mappedValue, message };

  await axios.post(url, payload);
}

export async function getSchool() {
  const url = "http://18.133.245.223:3000/api/school";
  const { data: school } = await axios.get(url);
  // console.log(school.map((s) => s.name));
}
