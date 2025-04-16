import { Button, Table, Tag, Tooltip } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getListJobByCompany } from "../../services/jobsServices";
import { Link } from "react-router-dom";
import { EyeOutlined } from '@ant-design/icons';
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";
function JobList(props) {
  const idCompany = getCookie("id");
  const { className } = props;
  const [jobs, setJobs] = useState([]);

  const fetchApi = async () => {
    const res = await getListJobByCompany(idCompany);
    if (res) {
      setJobs(res.reverse());
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

  const handleReload = () => {
    fetchApi();
  }
  const columns = [

    {
      title: 'Job',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (_, record) => (
        (record.tags || []).map((item, index) => (
          <Tag color="blue" key={index}>
            {item}
          </Tag>
        ))
      )
    },
    {
      title: 'Mức lương',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Thời gian',
      key: 'time',
      render: (_, record) => (
        <>
          <small>Ngày tạo: {record.createAt}</small>
          <br />
          <small> Cập nhật: {record.updateAt}</small>
        </>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <>
          {record.status ? (
            <Tag color="green">Đang bật</Tag>
          ) : (
            <Tag color="red">Đang tắt</Tag>

          )}
        </>
      )
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <>
          <Link to={`/detail-job/${record.id}`}>
            <Tooltip title="Xem chi tiết">
              <Button><EyeOutlined /></Button>
            </Tooltip>
          </Link>
          <EditJob
            record={record}
            onReload={handleReload}
          />
          <DeleteJob
            record={record}
            onReload={handleReload}
          />
        </>
      )
    },
  ]
  return (
    <>
      <div className={className} >
        <Table dataSource={jobs} columns={columns} />
      </div>
    </>
  )
}
export default JobList;