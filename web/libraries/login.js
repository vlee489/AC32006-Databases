import axios from 'axios';

const login = async (data) => {
  const response = await axios.post('https://ac32006api.vlee.me.uk/login', data);
  return response.data;
}

export default login;