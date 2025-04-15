import { Card } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getListCV } from "../../services/cvServices";

function CVStatistic() {
  const idCompany = getCookie("id");
  const [data, setData] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListCV(idCompany);
      if (res) {
        let job = {
          total: 0,
          statusOn: 0,
          statusOff: 0
        };
        job.total = res.length;
        res.forEach(item => {
          item.statusRead ? job.statusOn++ : job.statusOff++;
        })
        setData(job);
      }
    }
    fetchApi();
  }, []);
  return (
    <>
      {data && (
        <Card title="CV" className="mb-20">
          <div>
            Số lượng CV: <strong>{data.total}</strong>
          </div>
          <div>
            CV chưa đọc: <strong>{data.statusOn}</strong>
          </div>
          <div>
            CV đã đọc: <strong>{data.statusOff}</strong>
          </div>
        </Card>
      )}
    </>
  )
}
export default CVStatistic;