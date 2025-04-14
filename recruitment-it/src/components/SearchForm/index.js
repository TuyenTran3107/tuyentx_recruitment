
import { Button, Col, Form, Input, Row, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { getCityList } from "../../services/cityServices";
import { useNavigate } from "react-router-dom";
function SearchForm() {
  const navigate = useNavigate();
  const [city, setCity] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getCityList();
      if (res) {
        const cityAll = {
          key: 0,
          value: "All",
        };
        setCity([cityAll, ...res]);
      }
    }
    fetchApi();
  }, []);

  const handleFinish = (e) => {
    let city = e.city || "";
    city = e.city === "All" ? "" : city;
    navigate(`search?city=${city}&keyword=${e.keyword || ""}`);
  }
  return (
    <>
      <h1>1000+ Jobs for Developers</h1>
      <Form onFinish={handleFinish}>
        <Row gutter={[16, 16]}>
          <Col xxl={5} xl={5} lg={5}>
            <FormItem name="city">
              <Select options={city} placeholder="Select city"></Select>
            </FormItem>
          </Col>
          <Col xxl={10} xl={10} lg={10}>
            <FormItem name="keyword">
              <Input placeholder="Enter keyword" />
            </FormItem>
          </Col>
          <Col xxl={2} xl={2} lg={2}>
            <FormItem >
              <Button type="primary" htmlType="submit" block>Search</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </>
  )
}
export default SearchForm;