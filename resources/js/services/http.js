import axios, { Axios } from "axios";
import jwtDecode from "jwt-decode";
import { API_BASE_URL } from "@/utils/constants";
import router from '@/router'
import { useAuthStore } from "@/stores/auth.js";
import { notify } from "@kyvg/vue3-notification";


const handleOkResponse = (response, resolve) => {
  resolve(response);
};

const handleErrorResponse = (error, reject) => {
  if (!error.response) {
    reject(error);
    return;
  }
  const responseErrors = error.response.data?.errors;
  let errors = [];
  if (!responseErrors || responseErrors.length === 0) {
    errors = [error.response.data.message];
  } if (responseErrors.constructor  === Array){
    errors = Object.keys(responseErrors).reduce((currentErrors, key) => currentErrors.concat(responseErrors[key]), errors);
  } else errors = [error.response.data.errors]
  errors.forEach(error => {
    notify({
      text: error,
      type: 'error',
    });
  })
  reject(error);
};

const handleErrorResponseNotToast = (error, reject) => {
  // const { setLoadingBar, setLoadingCircleModal } = useLoaderStore();
  // setLoadingBar(false);
  // setLoadingCircleModal(false);
  // if (!error.response) {
  //   reject(error);
  //   return;
  // }
  // const reponseErrors = error.response.data?.errors;
  // let errors = [];
  // if (!reponseErrors || reponseErrors.length === 0) {
  //   errors = [error.response.data.message];
  // } else {
  //   errors = Object.keys(reponseErrors).reduce((currentErrors, key) => currentErrors.concat(reponseErrors[key]), errors);
  // }
  // if (error.response.data?.code !== "BAD_REQUEST") {
  //   setToastMessage({
  //     icon: "mdi-block-helper",
  //     show: true,
  //     timeout: 3000,
  //     color: 'red-darken-2',
  //     messages: errors
  //   });
  //   reject(error);
  //   return;
  // } else {
  //   reject(errors);
  // }
  reject(error);
};



const axiosInstance = axios.create({
  baseURL: API_BASE_URL, //'http://localhost:3000/api',
  timeout: 180000,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true // add this line to enable sending cookies with cross-site requests
});

// const refreshToken = async () => {
//   const {isAuthenticated} = storeToRefs(useAuthStore());
//   try {
//     axios.defaults.withCredentials = true;
//     const response = await axios.post(
//       `http://127.0.0.1:3000/api${REFRESH_URL}`
//     );
//     isAuthenticated.value = true;
//     return response.data.data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// Request interceptor
axiosInstance.interceptors.request.use(async (request) => {
  const { refreshToken } = useAuthStore();
  try {
    const token = localStorage.getItem('accessToken');
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
      const decoded = jwtDecode(token);
      if (decoded.exp > new Date().getTime() / 1000) {
        return request;
      };
    }
    const data = await refreshToken();
    localStorage.setItem('accessToken', data.accessToken);
    request.headers.Authorization = `Bearer ${data.accessToken}`;
    return request;
  } catch (exception) {
    console.log(exception);
  }
});

// Response interceptor
axiosInstance.interceptors.response.use(response => response, error => {
  if (!error.response) {
    // Show a generic error Toast (e.g. Server error, please retry)
    router.push({ name: 'loginRegister' });
    return Promise.reject('Server error, please retry');
  }
  const { status } = error.response;
  if (status === 401) {
    router.push({ name: 'loginRegister' });
  }
  return Promise.reject(error);
});

const service = {
  // download(endPoint, params) {
  //   const { setLoadingBar } = useLoaderStore();
  //   setLoadingBar(true);
  //   return new Promise((resolve, reject) => {
  //     axiosInstance
  //       .post(`${endPoint}`, params, { responseType: 'blob' })
  //       .then((response) => {
  //         const contentDispositions = response.headers['content-disposition'].split(';');
  //         let fileName = '';
  //         if (contentDispositions.length > 2) {
  //           fileName = contentDispositions[2].split('\'\'')[1];
  //         } else {
  //           fileName = contentDispositions[1].split('=')[1];
  //         }
  //         const blob = new Blob([response.data], { type: 'application/octet-stream' });
  //         const link = document.createElement('a');
  //         link.href = URL.createObjectURL(blob);
  //         link.download = decodeURIComponent(fileName);
  //         document.body.appendChild(link);
  //         link.click();
  //         link.remove();
  //         handleOkResponse(response, resolve);
  //       })
  //       .catch((error) => {
  //         error.response.data.text().then(value => {
  //           error.response.data = JSON.parse(value);
  //           handleErrorResponse(error, reject);
  //         });
  //       });
  //   });
  // },
  get (endPoint, params) {
    // const { setLoadingBar } = useLoaderStore();
    // setLoadingBar(true);
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`${endPoint}`, { params, paramsSerializer: params => { return qs.stringify(params) } })
        .then((response) => {
          handleOkResponse(response, resolve);
        })
        .catch((error) => {
          handleErrorResponse(error, reject);
        });
    });
  },
  post (endPoint, params, isToast = true) {
    // const { setLoadingBar } = useLoaderStore();
    // setLoadingBar(true);
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`${endPoint}`, params)
        .then((response) => {
          handleOkResponse(response, resolve);
        })
        .catch((error) => {
          if (isToast) {
            handleErrorResponse(error, reject);
          } else {
            handleErrorResponseNotToast(error, reject);
          }
        });
    });
  },
  put (endPoint, params) {
    // const { setLoadingBar } = useLoaderStore();
    // setLoadingBar(true);
    return new Promise((resolve, reject) => {
      axiosInstance
        .put(`${endPoint}`, params)
        .then((response) => {
          handleOkResponse(response, resolve);
        })
        .catch((error) => {
          handleErrorResponse(error, reject);
        });
    });
  },
  delete (endPoint) {
    // const { setLoadingBar } = useLoaderStore();
    // setLoadingBar(true);
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(`${endPoint}`)
        .then((response) => {
          handleOkResponse(response, resolve);
        })
        .catch((error) => {
          handleErrorResponse(error, reject);
        });
    });
  },
};
export default service;
