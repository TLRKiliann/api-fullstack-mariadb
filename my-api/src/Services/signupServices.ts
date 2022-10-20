import { app } from '../api/axiosconfig';
import { DataType } from '../Models/model';

type DataTypeProps = {
  datatype: DataType[]
};

const getUrlSign: string = '/api/getAllSignUp';

//GET ALL SIGNUP
const getAllSignUp = async () => {
  const request = app.get<DataTypeProps>(getUrlSign)
  return await request.then((response: any) => response.data)
};

const functionToCall = {
  getAllSignUp
};

export default functionToCall;