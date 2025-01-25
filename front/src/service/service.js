import axios from 'axios';
const apiUrl = import.meta.env.VITE_HOST_BACK;

export const getInfoHQ_end = () => {
  const reestul = axios.get(apiUrl + 'api/get_informationHQ')
  console.log(reestul)
  return reestul
      .then(response => {
          return response;
      })
      .catch(error => {
          return error;
      });
}

export const getInfoDetails_end = (storeName,storeCode, postDate) => {
    const boby = {
        storeName: storeName,
        storeCode: storeCode,
        postDate: postDate
      };
    const reestul = axios.post(apiUrl + `api/getInfoDetails`, boby)
    console.log(reestul) 
    return reestul
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
  }

