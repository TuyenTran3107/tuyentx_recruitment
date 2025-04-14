import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyServices";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

function Company() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAllCompany();
      if (res) {
        setData(res);
      }
    }
    fetchApi();
  }, []);
  return (
    <>
      <h2>Danh sách các công ty:</h2>
      <Row gutter={[16, 16]}>
        {data.map(item => (
          <Col span={6} key={item.id}>
            <Link to={`/company/${item.id}`}>
              <Card>
                <div className="mb-10">
                  Công ty: <strong>{item.companyName}</strong>
                </div>
                <div className="mb-10">
                  Số điện thoại: <strong>{item.phone}</strong>
                </div>
                <div className="mb-10">
                  Số nhân sự: <strong>{item.quantityPeople}</strong>
                </div>

                <div className="mb-10">
                  Địa chỉ: <strong>{item.address}</strong>
                </div>
                <div className="mb-10">
                  Website: <strong>{item.website}</strong>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}
export default Company;