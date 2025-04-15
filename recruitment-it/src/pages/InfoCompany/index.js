import { Button, Card, Col, Form, Input, notification, Row } from "antd";
import { rules } from "../../contants/rules";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { editCompany, getDetailCompany } from "../../services/companyServices";
import { getCookie } from "../../helpers/cookie";

function InfoCompany() {
  const idCompany = getCookie("id");
  const [info, setInfo] = useState();
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const fetchApi = async () => {
    const res = await getDetailCompany(idCompany);
    if (res) {
      setInfo(res);
      form.setFieldsValue(res);
    }
  };
  useEffect(() => {

    fetchApi();
  }, []);
  const handleFinish = async (values) => {
    const res = await editCompany(idCompany, values);
    if (res) {
      api.success({
        message: "Cập nhật thành công!",
        description: 'Cập nhật thông tin thành công!',
        duration: 2,
        placement: 'topRight'
      })
    }
    fetchApi();
    setIsEdit(false);
  }
  const handleEdit = () => {
    setIsEdit(true);

  }
  const handleCancel = () => {
    setIsEdit(false);
  }
  return (
    <>
      {contextHolder}

      <Card title="Thông tin công ty"
        className="mt-20"
        extra={
          isEdit ? (
            <Button onClick={handleCancel}>Huỷ</Button>
          ) : (
            <Button onClick={handleEdit}>Chỉnh sửa</Button >
          )
        }
      >
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={info}
          form={form}
          disabled={!isEdit}
        >
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="Tên công ty:" name="companyName" >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Email:" name="email" >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Số điện thoại:" name="phone" >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Địa chỉ:" name="address" >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Số lượng nhân sự:" name="quantityPeople" >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Thời gian làm việc:" name="workingTime" >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Link website:" name="website" >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả ngắn:" name="description" >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả chi tiết:" name="detail" >
                <TextArea rows={10} />
              </Form.Item>
            </Col>


            {isEdit && (
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Cập nhật
                  </Button>
                  <Button className="ml-10" onClick={handleCancel}>
                    Huỷ
                  </Button>
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </Card>
    </>
  )
}
export default InfoCompany;