import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getListCV } from "../../services/cvServices";
import { Button, Table, Tag, Tooltip } from "antd";
import { EyeOutlined } from '@ant-design/icons';

import { Link } from "react-router-dom";
import CVJobName from "./CVJobName";
import DeleteCV from "./DeleteCV";

function CVList(props) {
    const { className } = props;
    const idCompany = getCookie("id");
    const [cv, setCV] = useState();

    const fetchApi = async () => {
        const res = await getListCV(idCompany);
        if (res) {
            setCV(res.reverse());
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
            title: "Tên job",
            dataIndex: "nameJob",
            key: "nameJob",
            render: (_, record) => (
                <CVJobName record={record} />
            )
        },
        {
            title: "ID Job",
            key: "idJob",
            render: (_, record) => (
                <>
                    {record.idJob}
                </>
            )
        },
        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Ngày gửi",
            dataIndex: "createAt",
            key: "createAt",
        },
        {
            title: "Trạng thái",
            key: "statusRead",
            render: (_, record) => (
                <>
                    {record.statusRead ? (
                        <Tag color="green">Đã đọc</Tag>
                    ) : (
                        <Tag color="gray">Chưa đọc</Tag>

                    )}
                </>
            )
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_, record) => (
                <>
                    <Link to={`/detail-cv/${record.id}`}>
                        <Tooltip title="Xem chi tiết">
                            <Button><EyeOutlined /></Button>
                        </Tooltip>
                    </Link>
                    <DeleteCV
                        record={record}
                        onReload={handleReload}
                    />
                </>
            )
        },
    ]
    return (
        <>
            <div className={className}>
                <Table dataSource={cv} columns={columns} />
            </div>
        </>
    )
}
export default CVList;