import { app } from '../api/axiosconfig';
import { DataTypeContact } from '../Models/contactModel';

type DataTypeContactProps = {
  datatype: DataTypeContact[]
};

//const getUrlPhone: string = 'http://localhost:3001/getAllPhone';
const getUrlPhone: string = '/api/getAllPhone/';
//const postUrl: string = 'http://localhost:3001/getAllPhone';
const postUrl: string = '/api/createPhone/';
//const deleteUrl: string = 'http://localhost:3001/getAllPhone';
const deleteUrl: string = '/api/deletePhone';

const getNamePhone: string = '/api/getByName';

const getAllContact = async () => {
  const request = app.get<DataTypeContactProps>(getUrlPhone)
  return await request.then(response => response.data)
};

const createPhone = (formData: any) => {
  const request = app.post<any>(postUrl, formData)
  return request.then((response: any) => response.data)
};

const getOrderByName = async () => {
  const request = app.get<DataTypeContactProps>(getNamePhone)
  return await request.then((response: any) => response.data)
};

const removePhone = async (id: number): Promise<void> => {
  const request = app.delete<any>(`${deleteUrl}/${id}`)
  await request.then((response: any) => response.data)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response Delete:");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
  });
};

const functionPhone = {
	getAllContact,
  createPhone,
  getOrderByName,
  removePhone
};

export default functionPhone;