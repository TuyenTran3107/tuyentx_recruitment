import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailJob } from "../../services/jobsServices";
import { getDetailCompany } from "../../services/companyServices";
import { Button, Card, Col, Form, Input, notification, Row, Select, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getTimeCurrent } from "../../helpers/getTimeCurrent";
import { createCV } from "../../services/cvServices";
import '@ant-design/v5-patch-for-react-19';
const { Option } = Select;
function JobDetail() {
  const params = useParams();
  const [job, setJob] = useState();
  const [form] = Form.useForm();
  const [noti, contextHolder] = notification.useNotification();
  useEffect(() => {
    const fetchApi = async () => {
      const detailJob = await getDetailJob(params.id);
      const infoCompany = await getDetailCompany(detailJob.idCompany);
      const dataFinal = {
        ...detailJob,
        infoCompany: infoCompany
      }
      setJob(dataFinal);
    }
    fetchApi();
  }, []);

  const onFinish = async (values) => {
    values.idJob = job.id;
    values.idCompany = job.infoCompany.id;
    values.createAt = getTimeCurrent();
    const res = await createCV(values);
    if (res) {
      form.resetFields();
      noti.success({
        message: "Gửi yêu cầu thành công!",
        description: "Nhà tuyển dụng sẽ liên hệ với bạn trong thời gian sớm nhất."
      });
    } else {
      noti.error({
        message: "Gửi yêu cầu không thành công!",
        description: "Vui lòng gửi lại sau."
      })
    }

  }
  return (
    <>
      {contextHolder}
      {job && (
        <>
          <h1>{job.name}</h1>

          <Button
            href="#formApply"
            type="primary"
            className="mb-20"
          >
            ỨNG TUYỂN NGAY
          </Button>

          <div className="mb-20">
            <span>Tags: </span>
            {(job.tags || []).map((item, index) => (
              <Tag key={index} color="blue">
                {item}
              </Tag>
            ))}
          </div>
          <div className="mb-20">
            <span>Thành phố: </span>
            {(job.city || []).map((item, index) => (
              <Tag key={index} color="orange">
                {item}
              </Tag>
            ))}
          </div>
          <div className="mb-20">
            Mức lương: <strong>{job.salary}</strong>
          </div>
          <div className="mb-20">
            Địa chỉ công ty: <strong>{job.infoCompany.address}</strong>
          </div>
          <div className="mb-20">
            Thời gian đăng bài: <strong>{job.createAt}</strong>
          </div>
          <div className="mb-20">
            <div>Giới thiệu công ty:</div>
            <div>{job.infoCompany.description}</div>
          </div>
          <div className="mb-20">
            <div>Mô tả công việc:</div>
            <div>{job.description}</div>
          </div>

          <Card title="Ứng tuyển ngay" id="formApply">
            <Form
              name="form_apply"
              layout="vertical"
              form={form}
              onFinish={onFinish}

            >
              <Row gutter={10}>
                <Col span={6}>
                  <Form.Item label="Họ tên" name="name" >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Số điện thoại" name="phone" >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Email" name="email" >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Thành phố" name="city" >
                    <Select>
                      {job.city.map((item, index) => (
                        <Option value={item} label={item} key={index}></Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Giới thiệu bản thân" name="description">
                    <TextArea rows={6} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Danh sách project:"
                    name="linkProject"
                  >
                    <TextArea rows={6} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Gửi yêu cầu
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </>
      )}
    </>
  )
}
export default JobDetail;