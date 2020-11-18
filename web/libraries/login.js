import axios from 'axios';

const login = async (data) => {
  const response = await axios.post('http://168.119.243.209:4000/login', data);
  return response.data;
}

export default login;
