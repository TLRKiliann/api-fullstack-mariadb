export type DataType = {
  id?: any | null;
  datee: string;
  hour: string;
  location: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  notice: string;
  editNum: boolean;
  editName: boolean;
};

export type DataTypeProps = {
  datatype: DataType;
};