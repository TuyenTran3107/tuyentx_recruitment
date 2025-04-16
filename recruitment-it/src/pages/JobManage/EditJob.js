import { Button, Col, Form, Input, message, Modal, Row, Select, Switch, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getListTag } from "../../services/tagServices";
import { getCityList } from "../../services/cityServices";
import TextArea from "antd/es/input/TextArea";
import { EditOutlined } from '@ant-design/icons';
import { getTimeCurrent } from "../../helpers/getTimeCurrent";
import { editJob } from "../../services/jobsServices";
function EditJob(props) {
  const { record, onReload } = props;
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState([]);
  const [mess, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const showModal = () => {
    form.setFieldsValue({
      name: record.name,
      tags: record.tags,
      salary: record.salary,
      city: record.city,
      description: record.description,
      status: record.status
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleFinish = async (values) => {
    console.log(values)
    values.updateAt = getTimeCurrent();
    const res = await editJob(record.id, values);
    if (res) {
      setIsModalOpen(false);
      onReload();
      mess.open({
        type: "success",
        content: "Cập nhật thành công!",
        duration: 2
      })
    } else {
      mess.open({
        type: "error",
        content: "Cập nhật không thành công!",
        duration: 2
      })
    }
  }
  return (
    <>
      {contextHolder}
      <Button onClick={showModal} className="ml-5">
        <Tooltip title="Chỉnh sửa">
          <EditOutlined />
        </Tooltip>
      </Button>
      <Modal title="Chỉnh sửa" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                  Cập nhật
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

    </>
  )
}
export default EditJob;