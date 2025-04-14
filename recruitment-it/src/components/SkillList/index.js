import { useEffect, useState } from "react";
import { getListTag } from "../../services/tagServices";
import { Tag } from "antd";
import { Link } from "react-router-dom";

function SkillList() {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListTag();
      if (res) {
        setTags(res);
      }
    }
    fetchApi();
  }, []);
  return (
    <>
      <div className="mb-20">
        {tags.map(item => (
          <Link to={`/search?keyword=${item.value}`} key={item.key}>
            <Tag className="mb-5" color="blue" >
              {item.value}
            </Tag>
          </Link>
        ))}
      </div>
    </>
  )
}
export default SkillList;