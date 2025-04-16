import { Button, Col, Form, Input, message, Row, Select, Switch } from "antd";
import { rules } from "../../contants/rules";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { getListTag } from "../../services/tagServices";
import { getCityList } from "../../services/cityServices";
import { getCookie } from "../../helpers/cookie";
import { getTimeCurrent } from "../../helpers/getTimeCurrent";
import { createJob } from "../../services/jobsServices";

function CreateJob() {
  const idCompany = getCookie("id");
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState([]);

  const [mess, contextHolder] = message.useMessage();
  useEffect(() => {
    const fetchApi = async () => {
      const resTag = await getListTag();
      setTags(resTag);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const resCity = await getCityList();
      setCity(resCity);
    };
    fetchApi();
  }, []);
  const handleFinish = async (values) => {
    console.log(values)
    values.idCompany = idCompany;
    values.createAt = getTimeCurrent();
    const res = await createJob(values);
    if (res) {
      form.resetFields();
      mess.open({
        type: "success",
        content: "Tạo job mới thành công!",
        duration: 3
      })
    } else {
      mess.open({
        type: "error",
        content: "Tạo job mới không thành công!",
        duration: 3
      })
    }
  }
  return (
    <>
      {contextHolder}
      <h2>Tạo job mới</h2>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        form={form}
      >
        <Row gutter={20}>
          <Col span={24}>
            <Form.Item label="Tên job" name="name" >
              <Input />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="Tags" name="tags" >
              <Select options={tags} mode="multiple" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Mức lương" name="salary" >
              <Input addonAfter="$" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Thành phố" name="city" >
              <Select options={city} mode="multiple" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mô tả" name="description" >
              <TextArea rows={10} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Trạng thái"
              name="status"
            // valuePropName="checked"
            >
              <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item  >
              <Button htmlType="submit" type="primary">
                Tạo mới
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}
export default CreateJob;