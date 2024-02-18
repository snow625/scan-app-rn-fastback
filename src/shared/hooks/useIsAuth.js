import { useSelector } from "react-redux";
import { getUserIsAuth } from "@redux/auth/authSelector";

export default function isAuth() {
  return useSelector(getUserIsAuth);
}
