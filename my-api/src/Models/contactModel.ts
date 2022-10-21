export type DataTypeContact = {
  id?: number | null;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  location: string;
};

export type DataTypeContactProps = {
  datatype: DataTypeContact;
};