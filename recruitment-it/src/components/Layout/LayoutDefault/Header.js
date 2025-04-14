import { Button } from "antd";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="layout-default__header">
        <div className="layout-default__logo">IT Jobs</div>
        <div className="layout-default__buttons">
          <Button className="layout-default__buttons--login">
            <Link to="login/">Đăng nhập</Link>

          </Button>
          <Button type="primary" className="layout-default__buttons--register">
            <Link to="register/">Đăng ký</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
export default Header;
