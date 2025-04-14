import { Button } from "antd";
import { Link } from "react-router-dom";
import { getCookie } from "../../../helpers/cookie";
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
function Header() {
  const token = getCookie("token");
  useSelector(state => state.loginReducer)
  return (
    <>
      <div className="layout-default__header">
        <div className="layout-default__logo">IT Jobs</div>

        {token ? (
          <>
            <div className="layout-default__buttons">
              <Button className="layout-default__buttons--manage">
                <Link to="/admin">
                  <UserOutlined />
                  <span> Quản lý</span>
                </Link>
              </Button>
              <Button className="layout-default__buttons--logout">
                <Link to="/logout">
                  <LogoutOutlined />
                  <span> Đăng xuất</span>
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="layout-default__buttons">
              <Button className="layout-default__buttons--login">
                <Link to="login/">Đăng nhập</Link>
              </Button>
              <Button type="primary" className="layout-default__buttons--register">
                <Link to="register/">Đăng ký</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
export default Header;
