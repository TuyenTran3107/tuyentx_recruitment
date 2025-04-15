import { Card } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getListJobByCompany } from "../../services/jobsServices";

function JobStatistic() {
  const idCompany = getCookie("id");
  const [data, setData] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListJobByCompany(idCompany)
      if (res) {
        let job = {
          total: 0,
          statusOn: 0,
          statusOff: 0
        };
        job.total = res.length;
        res.forEach(item => {
          item.status ? job.statusOn++ : job.statusOff++;
        })
        setData(job);
      }
    }
    fetchApi();
  }, []);

  return (
    <>
      {data && (
        <Card title="Job" className="mb-20">
          <div>
            Số lượng job: <strong>{data.total}</strong>
          </div>
          <div>
            Job đang bật: <strong>{data.statusOn}</strong>
          </div>
          <div>
            Job đang tắt: <strong>{data.statusOff}</strong>
          </div>
        </Card>
      )}
    </>
  )
}
export default JobStatistic;