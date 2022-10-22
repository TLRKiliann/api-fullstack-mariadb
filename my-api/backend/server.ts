import express, {Request, Response, NextFunction} from 'express';
import mariadb from 'mariadb';
import dotenv from 'dotenv';

const meetingpoint = require('./routes/meeting');
const phonecontact = require('./routes/phone');
const meetingByDate = require('./routes/meetingByDate');
const meetingByHour = require('./routes/meetingByHour');
const meetingNewContact = require('./routes/createMeetingContact');
const meetingUpdateEditNum = require('./routes/meetingUpdateEditNum');
const mettingUpdatePhone = require('./routes/meetingUpdatePhone');
const mettingEditFirstname = require('./routes/meetingUpdateEditFirst');
const mettingUpdateFirstname = require('./routes/meetingUpdateFirstname');
const meetingUpdateMail = require('./routes/meetingUpdateEmail');
//const meetingDeleteById = require('./routes/meetingDelete');
const createForContact = require('./routes/createPhoneContact');
const orderByName = require('./routes/phoneOrderByName');
const meetLastnameUrl = require('./routes/updateLastname');

const app = express();

const cors = require('cors');
app.use(cors());

//const routeLogin = require('./Routes/Login');
//const routeSignUp = require('./Routes/SignUp');

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//.env
dotenv.config();

app.use(function(req:Request, res:Response, next:NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Content-Type', 'application/json');
  next();
});

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  //port: process.env.DB_PORT,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE
});

console.log("Total connections: ", pool.totalConnections());
console.log("Active connections: ", pool.activeConnections());
console.log("Idle connections: ", pool.idleConnections());

// Fetch Connection
/*async function fetchConn() {
   let conn = await pool.getConnection();
   console.log("Total connections: ", pool.totalConnections());
   console.log("Active connections: ", pool.activeConnections());
   console.log("Idle connections: ", pool.idleConnections());
   return conn;
}*/

app.delete('/api/delete/:id', async (request:Request<{ id: number}>, response:Response, next:NextFunction) => {
  const id = request.params.id;
  try {
    const result = await pool.query('delete from meetingpoint where id = ?',
      [id]);
    response.status(204).json("Meeting deleted successfully !");
  } catch (err) {
    throw err;
  } 
});

//Delete phonecontact
app.delete('/api/deletePhone/:id', async (request, response) => {
  const id = request.params.id;
  try {
    const result = await pool.query('delete from phonecontact where id = ?',
      [id]);
    response.status(204).json("Phone deleted successfully !");
  } catch (err) {
    throw err;
  } 
});

//Login but with mariadb...
//app.use('/login', login);
//app.use('/login', routeLogin);
//app.use('/signup', routeSignUp);
app.post('/login', async (req, res, next) => {
  const email:string = req.body.email;
  const password:string = req.body.password;
  try {
    const result = await pool.query('select * from\
      loggers where email = ? and password = ?',
    [email, password]);
    res.status(201).json("Accepted !")
  } catch (err) {
    throw err;
  }
  next();
});

app.get('/api/getAllSignUp', async (request:Request,
  response:Response):Promise<void> => {
  try {
      const result = await pool.query("select * from loggers");
      response.status(200).json(result);
  } catch (err) {
    throw err;
  }
});

//SIGNUP
app.post("/signup", async (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await pool.query('insert into loggers\
      (id, name, email, password) values (?,?,?,?)',
      [id, name, email, password])
    res.status(201).json("Member created");
  } catch (err) {
    throw err;
  }
  next();
});

app.use('/api/getAllMembers', meetingpoint);
app.use('/api/getAllPhone', phonecontact);
app.use('/api/getByDate', meetingByDate);
app.use('/api/getByHour', meetingByHour);
app.use('/api/create', meetingNewContact);
app.use('/api/update/:id', meetingUpdateEditNum);
app.use('/api/updateNum/:id', mettingUpdatePhone);
app.use('/api/updatename/:id', mettingEditFirstname);
app.use('/api/updatevalname/:id', mettingUpdateFirstname);
app.use('/api/updatemail/:id', meetingUpdateMail);
//app.use('/api/delete/:id', meetingDeleteById);
app.use('/api/createPhone', createForContact);
app.use('/api/getByName', orderByName);
app.use('/api/updatelastname/:id', meetLastnameUrl);

app.listen(PORT, (): void => {
  console.log(`[+] Server is running on port ${PORT} !`)
});