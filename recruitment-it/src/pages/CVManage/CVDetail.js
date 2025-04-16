import { Card, Tag } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { changeStatusCV, getDetailCV } from "../../services/cvServices";
import { getDetailJob } from "../../services/jobsServices";

function CVDetail() {
    const params = useParams();
    const [cv, setCV] = useState();
    const [job, setJob] = useState();
    useEffect(() => {
        const fetchApi = async () => {
            const resCV = await getDetailCV(params.id);
            if (resCV) {
                const resJob = await getDetailJob(resCV.idJob);
                if (resJob) {
                    setCV(resCV);
                    setJob(resJob);
                }
            }
            changeStatusCV(params.id, { statusRead: "true" })

        };
        fetchApi();
    }, []);

    return (
        <>
            {cv && job && (
                <>
                    <Card title={`Ứng viên: ${cv.name}`} className="mt-20">
                        <div className="mb-20">
                            Ngày gửi:<strong className="ml-10">{cv.createAt}</strong>
                        </div>
                        <div className="mb-20">
                            Số điện thoại:<strong className="ml-10">{cv.phone}</strong>
                        </div>
                        <div className="mb-20">
                            Email:<strong className="ml-10">{cv.email}</strong>
                        </div>
                        <div className="mb-20">
                            Thành phố ứng tuyển:<strong className="ml-10">{cv.city}</strong>
                        </div>
                        <div className="mb-20">
                            Giới thiệu bản thân:<div className="ml-10">{cv.description}</div>
                        </div>
                        <div className="mb-20">
                            Link project:<div className="ml-10">{cv.linkProject}</div>
                        </div>
                    </Card>
                    <Card title={`Thông tin job: ${job.name}`} className="mt-20 mb-20">
                        <div className="mb-20">
                            Tags:<strong className="ml-10">{job.tags.map(item => (
                                <Tag color="blue">{item}</Tag>
                            ))}</strong>
                        </div>
                        <div className="mb-20">
                            Thành phố:<strong className="ml-10">{job.city.map(item => (
                                <Tag color="orange">{item}</Tag>
                            ))}</strong>
                        </div>
                        <div className="mb-20">
                            Mức lương:<strong className="ml-10">{job.salary}</strong>
                        </div>
                        <div className="mb-20">
                            Mô tả:<div className="ml-10">{job.description}</div>
                        </div>

                    </Card>
                </>
            )}
        </>
    )
}
export default CVDetail;