import { useEffect } from "react";
import { deleteAllCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  deleteAllCookie();
  useEffect(() => {
    dispatch(checkLogin(false));
    navigate("/login");
  }, [])
  return (
    <>
    </>
  )
}
export default Logout;