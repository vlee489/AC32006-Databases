import axios from 'axios';

const port = 4000;

export const login = async (data) => {
  const response = await axios.post('http://168.119.243.209:4000/login', data);
  return response.data;
}

// export const login = async (email, password) => {
//   axios.post('http://168.119.243.209:4000/login', {
//     email: email,
//     password: password
//   })
//   .then(function (response) {
//     return response;
//   })
//   .catch(function (error) {
//     return error;
//   });
// }


// export const login = async (email, password) => {
//   axios({
//     method: 'post',
//     url: 'http://168.119.243.209:4000/login',
//     data: {
//       email,
//       password
//     }
//   })
//     .then(response => response)
//     .catch(function (error) {
//       console.log(error);
//       return error;
//     });
// }
