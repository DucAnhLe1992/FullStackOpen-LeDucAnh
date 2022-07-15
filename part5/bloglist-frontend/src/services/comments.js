import axios from "axios";
const baseUrl = "/api/blogs";

const getAllComments = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}/comments`);
  return res.data;
};

const postAComment = async (blogId, comment) => {
  const res = await axios.post(`${baseUrl}/${blogId}/comments`, comment);
  return res.data;
};

export default { getAllComments, postAComment };
