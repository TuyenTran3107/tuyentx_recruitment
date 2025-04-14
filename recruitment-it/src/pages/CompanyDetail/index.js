import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getDetailCompany } from "../../services/companyServices";
import { getDetailJob, getListJobByCompany } from "../../services/jobsServices";
import { Col, Row } from "antd";
import JobItem from "../../components/JobItem";

function CompanyDetail() {
  const params = useParams();
  const [infoCompany, setInfoCompany] = useState({});
  const [jobsByCompany, setJobsByCompany] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getDetailCompany(params.id);
      if (res) {
        setInfoCompany(res);
      }
    }
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListJobByCompany(params.id);
      if (res) {
        setJobsByCompany(res);
      }
    }
    fetchApi();
  }, []);
  return (
    <>
      {infoCompany && (
        <>
          <h2>{infoCompany.companyName}</h2>
          <div className="mb-20">
            Địa chỉ: <strong>{infoCompany.address}</strong>
          </div>
          <div className="mb-20">
            Số lượng nhân sự: <strong>{infoCompany.quantityPeople}</strong>
          </div>
          <div className="mb-20">
            Thời gian làm việc: <strong>{infoCompany.workingTime}</strong>
          </div>
          <div className="mb-20">
            Link website: <strong>{infoCompany.website}</strong>
          </div>
          <div className="mb-20">
            <div className="mb-20">Mô tả ngắn:</div>
            <div>{infoCompany.description}</div>
          </div>
          <div className="mb-20">
            <div className="mb-20">Mô tả chi tiết:</div>
            <div>{infoCompany.detail}</div>
          </div>

          <div className="mb-10">Danh sách các job:</div>
          <Row gutter={[16, 16]}>
            {jobsByCompany.map(item => (
              <Col span={6} key={item.id}>
                <JobItem item={item} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}
export default CompanyDetail