import { useEffect, useState } from "react";
import { getDetailJob } from "../../services/jobsServices";

function CVJobName(props) {
    const { record } = props;
    const [jobName, setJobName] = useState();
    // console.log(record.idJob)
    // console.log(record)
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getDetailJob(record.idJob);
            if (res) {
                setJobName(res)
            }
        }
        fetchApi();
    }, []);
    return (
        <>
            {jobName && (
                <>
                    {jobName.name}
                </>
            )}
        </>
    )
}
export default CVJobName;