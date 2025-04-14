import { Button, Card, Col, Form, Input, notification, Row } from "antd";
import { rules, validateMessages } from "../../contants/rules";
import { generateToken } from "../../helpers/generateToken";
import { checkExist, createCompany } from "../../services/companyServices";
import { useNavigate } from "react-router-dom";

function Register() {
  const [messageApi, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    values.token = generateToken();
    const checkExistEmail = await checkExist("email", values.email);
    const checkExistPhone = await checkExist("phone", values.phone);
    if (checkExistEmail.length > 0) {
      messageApi.error({ message: "Email đã tồn tại!" })
    } else if (checkExistPhone.length > 0) {
      messageApi.error({ message: "Số điện thoại đã tồn tại!" })
    } else {
      const result = await createCompany(values);
      if (result) {
        navigate("/login");
      }
    }
  }
  return (
    <>
      {contextHolder}
      <Row gutter={[12, 12]} justify="center">
        <Col span={10}>
          <Card title="Đăng ký tài khoản">
            <Form
              onFinish={onFinish}
              layout="vertical"
              validateMessages={validateMessages}>
              <Form.Item label="Tên công ty:" name="companyName" rules={rules.companyName}>
                <Input />
              </Form.Item>
              <Form.Item label="Email:" name="email" rules={rules.email}>
                <Input />
              </Form.Item>
              <Form.Item label="Số điện thoại:" name="phone" >
                <Input />
              </Form.Item>
              <Form.Item label="Password:" name="password" rules={rules.password}>
                <Input.Password />
              </Form.Item>
              <Form.Item >
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default Register;