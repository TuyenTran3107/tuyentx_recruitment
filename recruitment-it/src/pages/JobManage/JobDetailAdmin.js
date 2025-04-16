import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailJob } from "../../services/jobsServices";
import { Tag } from "antd";

function JobDetailAdmin() {
  const params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getDetailJob(params.id);
      if (res) {
        setData(res);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      {data && (
        <>
          <h2>Tên JOB: {data.name}</h2>
          <div className="mb-20">
            <span>Trạng thái: </span>
            {data.status ? (
              <Tag color="blue">Đang bật</Tag>
            ) : (
              <Tag color="red">Đang tắt</Tag>
            )}
          </div>
          <div className="mb-20">
            <span>Tags: </span>
            {data.tags.map(item => (
              <Tag color="blue">{item} </Tag>
            ))}
          </div>
          <div className="mb-20">
            Mức lương: <strong className="ml-10">{data.salary}</strong>
          </div>
          <div className="mb-20">
            Ngày tạo: <strong className="ml-10">{data.createAt}</strong>
          </div>
          <div className="mb-20">
            Cập nhật: <strong className="ml-10">{data.updateAt}</strong>
          </div>
          <div className="mb-20">
            <span>Thành phố: </span>
            {data.city.map(item => (
              <Tag color="orange">{item} </Tag>
            ))}
          </div>
          <div className="mb-20">
            Mô tả: {data.description}
          </div>
        </>
      )}

    </>
  )
}
export default JobDetailAdmin;