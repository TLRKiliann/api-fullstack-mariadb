import { app } from '../api/axiosconfig';
import { DataType } from '../Models/model';

type DataTypeProps = {
  datatype: DataType[]
};

/*
const getUrl: string = 'http://localhost:3001/getAllMembers';
const putUrl: string = 'http://localhost:3001/getAllMembers';
const putNameUrl: string = 'http://localhost:3001/getAllMembers';
const postUrl: string = 'http://localhost:3001/getAllMembers';
const deleteUrl: string = 'http://localhost:3001/getAllMembers';
*/

const getUrl: string = '/api/getAllMembers';
const getByO: string = '/api/getByDate';
const getByH: string = '/api/getByHour';
const postUrl: string = '/api/create';

const putEditPhoneUrl: string = '/api/update';
const putPhoneUrl: string = '/api/updateNum';

const putEditNameUrl: string = '/api/updatename';
const putValidNameUrl: string = '/api/updatevalname';

const putValidEmailUrl: string = '/api/updatemail';

const deleteUrl: string = '/api/delete';
//const URL_API = 'http://localhost:5000';

//GET
const getAll = async () => {
  const request = app.get<DataTypeProps>(getUrl)
  return await request.then((response: any) => response.data)
};

//Date
const getByOrderDate = async () => {
  const request = app.get<DataTypeProps>(getByO)
  return await request.then((response: any) => response.data)
}

//Hour
const getByOrderHour = async () => {
  const request = app.get<DataTypeProps>(getByH)
  return await request.then((response: any) => response.data)
}

//POST
const create = (formData: any) => {
  const request = app.post<any>(postUrl, formData)
  return request.then((response: any) => response.data)
};

//PUT number
const updateNumber = (id: number, formData: any) => {
  try {
    let request = app.put<any>(`${putEditPhoneUrl}/${id}`, formData)
    console.log("request-1 !!!", request)
    return request.then((response: any) => response.data)
  } catch (err: any) {
    console.error("Error response PUT-1:");
    console.error("erd", err.response.data);    // ***
    console.error("ers", err.response.status);  // ***
    console.error("erh", err.response.headers); // ***
    throw err;
    }
};

//PUT number
const updateValNum = (id: number, formData: any) => {
  try {
    let request = app.put<any>(`${putPhoneUrl}/${id}`, formData)
    console.log("request-2 !!!", request)
    return request.then((response: any) => response.data)
  } catch (err: any) {
    console.error("Error response PUT-2:");
    console.error("erd", err.response.data);    // ***
    console.error("ers", err.response.status);  // ***
    console.error("erh", err.response.headers); // ***
    throw err;
  }
};

//PUT firstname
const updateName = (id: number, formData: any) => {
  try {
    console.log(formData)
    let request = app.put<any>(`${putEditNameUrl}/${id}`, formData)
    return request.then((response: any) => response.data)
  } catch (err: any) {
    console.error("Error response PUT:");
    console.error("erd", err.response.data);    // ***
    console.error("ers", err.response.status);  // ***
    console.error("erh", err.response.headers); // ***
    throw err;
  } 
};

//PUT firstname
const updateValName = (id: number, formData: any) => {
  try {
    console.log(formData)
    let request = app.put<any>(`${putValidNameUrl}/${id}`, formData)
    return request.then((response: any) => response.data)
  } catch (err: any) {
    console.error("Error response PUT:");
    console.error("erd", err.response.data);    // ***
    console.error("ers", err.response.status);  // ***
    console.error("erh", err.response.headers); // ***
    throw err;
  }
};

//PUT firstname
const updateValEmail = (id: number, formData: any) => {
  try {
    console.log(formData)
    let request = app.put<any>(`${putValidEmailUrl}/${id}`, formData)
    return request.then((response: any) => response.data)
  } catch (err: any) {
    console.error("Error response PUT:");
    console.error("erd", err.response.data);    // ***
    console.error("ers", err.response.status);  // ***
    console.error("erh", err.response.headers); // ***
    throw err;
  }
};

//Delete
const remove = async (id: number): Promise<void> => {
    const request = app.delete<any>(`${deleteUrl}/${id}`)
    await request.then((response: any) => response.data)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
  });
}

const functionToCall = {
  getAll,
  getByOrderDate,
  getByOrderHour,
  create,
  updateNumber,
  updateValNum,
  updateName,
  updateValName,
  updateValEmail,
  remove
};

export default functionToCall;