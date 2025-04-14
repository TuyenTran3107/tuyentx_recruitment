import { get } from "../utils/request"

export const getCityList = async () => {
  const res = await get("city");
  return res;
}