import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3333/",
});

API.interceptors.request.use(async config => {
  // Declaramos um token manualmente para teste.
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiZThiZDgwLWQ5M2MtNDNhMC1iMDk2LTg5MDZhNjY1ZmYxMyIsImlhdCI6MTYzMDg2MTIzOCwiZXhwIjoxNjMxMDM0MDM4fQ.2_gYZeYqvFMGGiY9oRCa4Np1sUdXbK7sXsPvrL-_NfI";

  if (token) {
    API.defaults.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;




// import axios from "axios";

// const API = axios.create({
//     baseURL: "http://localhost:3333/",
// });


// // API.interceptors.request.use(async config => {
// //   // Declaramos um token manualmente para teste.
// //   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiZThiZDgwLWQ5M2MtNDNhMC1iMDk2LTg5MDZhNjY1ZmYxMyIsImlhdCI6MTYzNDQxNTAwNiwiZXhwIjoxNjM0NTg3ODA2fQ.tF23TLGITg1nqF6JiROUpgjHIipI0I2a1zRGVHhHRMI";

// //   if (token) {
// //     API.defaults.headers.authorization = `Bearer ${token}`;
// //   }

// //   return config;
// // });

// export default API;