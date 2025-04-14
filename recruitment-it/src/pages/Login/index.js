import { Button, Card, Col, Form, Input, notification, Row } from "antd";
import { rules, validateMessages } from "../../contants/rules";
import * as company from "../../services/companyServices";
import { setCookie } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";

function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const data = await company.login(values.email, values.password);
    console.log(data)
    if (data.length > 0) {
      const time = 1;
      setCookie("id", data[0].id, time);
      setCookie("companyName", data[0].companyName, time);
      setCookie("email", data[0].email, time);
      setCookie("token", data[0].token, time);
      dispatch(checkLogin(true));
      navigate("/")
    } else {
      messageApi.error({
        message: "Tài khoản hoặc mật khẩu không chính xác!"
      });
    }
  }
  return (
    <>
      {contextHolder}
      <Row gutter={[12, 12]} justify="center">
        <Col span={10}>
          <Card title="Đăng nhập">
            <Form
              onFinish={onFinish}
              layout="vertical"
              validateMessages={validateMessages}>

              <Form.Item label="Email:" name="email" rules={rules.email}>
                <Input />
              </Form.Item>

              <Form.Item label="Password:" name="password" rules={rules.password}>
                <Input.Password />
              </Form.Item>
              <Form.Item >
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default Login;