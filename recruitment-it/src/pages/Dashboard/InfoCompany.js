import { Card } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getDetailCompany } from "../../services/companyServices";

function InfoCompany() {
  const idCompany = getCookie("id");
  const [info, setInfo] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getDetailCompany(idCompany);
      if (res) {
        setInfo(res);
      }
    }
    fetchApi();
  }, []);

  return (
    <>
      {info && (
        <Card title="Thông tin công ty" className="mb-20">
          <div>
            Tên công ty: <strong>{info.companyName}</strong>
          </div>
          <div>
            Email: <strong>{info.email}</strong>
          </div>
          <div>
            Số điện thoại: <strong>{info.phone}</strong>
          </div>
          <div>
            Số nhân viên: <strong>{info.quantityPeople}</strong>
          </div>
        </Card>
      )}
    </>
  )
}
export default InfoCompany;