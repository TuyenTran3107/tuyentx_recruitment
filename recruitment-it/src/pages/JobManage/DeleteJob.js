import { DeleteFilled } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { deleteJob } from '../../services/jobsServices';

function DeleteJob(props) {
  const { record, onReload } = props;
  const handleDelete = async () => {
    const res = await deleteJob(record.id);
    if (res) {
      onReload();
    }
  }
  return (
    <>

      <Tooltip title="Xoá">
        <Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={handleDelete}>
          <Button className='ml-5'>
            <DeleteFilled />
          </Button>
        </Popconfirm>
      </Tooltip>

    </>
  )
}
export default DeleteJob;