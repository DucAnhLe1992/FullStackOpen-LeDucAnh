import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const createNewPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((res) => res.data);
};

const deleteAPerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const changePersonNumber = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson);
};

export default {
  getAllPersons,
  createNewPerson,
  deleteAPerson,
  changePersonNumber,
};
