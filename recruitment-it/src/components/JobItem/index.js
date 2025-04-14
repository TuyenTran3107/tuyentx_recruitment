import { Card, Tag } from 'antd';
import { Link } from 'react-router-dom';
function JobItem(props) {

  const { item } = props;
  return (
    <>
      <Card
        title={<Link to={`/jobs/${item.id}`}>{item.name}</Link>}
      >
        <div className="mb-10">
          <span>Ngôn ngữ: </span>
          {item.tags.map((item, index) => (
            <Tag color='blue' key={index} className='mb-5'>
              {item}
            </Tag>
          ))}
        </div>

        <div className="mb-10">
          <span>Thành phố:  </span>
          {item.city.map((item, index) => (
            <Tag color='orange' key={index} className='mb-5'>
              {item}
            </Tag>
          ))}
        </div>

        <div className='mb-10'>
          Lương: <strong>{item.salary}</strong>
        </div>

        <div className='mb-10'>
          Công ty: <strong>{item?.infoCompany?.companyName}</strong>
        </div>
        <div className='mb-10'>
          Ngày tạo: <strong>{item.createAt}</strong>
        </div>
      </Card>
    </>
  )
}
export default JobItem; 