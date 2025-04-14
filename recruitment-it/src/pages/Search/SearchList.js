import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyServices";
import { Col, Row } from 'antd';
import JobItem from "../../components/JobItem";

function SearchList(props) {
  const { data } = props;
  const [dataFinal, setDataFinal] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const company = await getAllCompany();

      const newData = data.map(item => {
        const infoCompany = company.find(infoCompany => infoCompany.id === item.idCompany);
        return {
          ...item,
          infoCompany: infoCompany
        }
      });
      setDataFinal(newData);
    };
    fetchApi();
  }, []);
  console.log(dataFinal)
  return (
    <>
      {dataFinal.length > 0 ? (
        <div className="mt-20">
          <Row gutter={[16, 16]}>
            {dataFinal.map(item => (
              <Col span={6} key={item.id}>
                <JobItem item={item} />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div className="mt-20">No result.</div>
      )}
    </>
  )
} export default SearchList;