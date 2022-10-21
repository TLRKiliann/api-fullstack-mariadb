import express, {Request, Response, NextFunction} from 'express';
import mariadb from 'mariadb';
import dotenv from 'dotenv';

const meetingpoint = require('./routes/meeting');
const phonecontact = require('./routes/phone');

const app = express();

const cors = require('cors');
app.use(cors());
// or for google browser for "withCredential":
//app.use(cors({credentials: true, origin: `http://localhost:3000`}));

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

// GET MARIADB
/*app.get('/api/getAllMembers', async (request:Request,
  response:Response):Promise<void> => {
  try {
      const result = await pool.query("select * from meetingpoint");
      response.status(200).json(result);
  } catch (err) {
    throw err;
  }
});*/

app.get('/api/getByDate', async(request:Request,
  response:Response):Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM meetingpoint \
      ORDER BY DATE(STR_TO_DATE(datee, '%d-%m-%Y %H')),\
      TIME(STR_TO_DATE(datee, '%d-%m-%Y %H')) ASC");
    response.status(200).json(result);
  } catch (err) {
    throw err;
  }
});

app.get('/api/getByHour', async(request:Request,
  response:Response):Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM meetingpoint \
      WHERE HOUR(STR_TO_DATE(datee, '%d-%m-%Y %H:%i'))\
      ORDER BY HOUR(STR_TO_DATE(datee, '%d-%m-%Y %H:%i')) ASC");
    response.status(200).json(result);
  } catch (err) {
    throw err;
  }
});

app.get('/api/getByHour', async(request:Request,
  response:Response):Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM meetingpoint \
      WHERE TIME_FORMAT(datee, '%d-%m-%Y %H:%i')\
      ORDER BY TIME_FORMAT(datee, '%d-%m-%Y %H:%i') ASC");
    response.status(200).json(result);
  } catch (err) {
    throw err;
  }
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

// POST MARIADB
app.post('/api/create', async (request:Request, response:Response) => {
  const id = request.body.id;
  const datee: string = request.body.datee;
  const hour: string = request.body.hour;
  const location: string = request.body.location;
  const firstname: string = request.body.firstname;
  const lastname: string = request.body.lastname;
  const phone: string = request.body.phone;
  const email: string = request.body.email;
  const notice: string = request.body.notice;
  const editNum: boolean = request.body.editNum;
  const editName: boolean = request.body.editName;
  try {
    const result = await pool.query("insert into meetingpoint (id,\
      datee, hour, location,\
      firstname, lastname, phone, email, notice, editNum, editName)\
      values (?,?,?,?,?,?,?,?,?,?,?)",
    [id, datee, hour, location, firstname, lastname,
    phone, email, notice, editNum, editName]);
    response.status(201).json('New meeting created successfully');
  } catch (err) {
    throw err;
  }
});

// PUT editNum
app.put('/api/update/:id', async (request, response) => {
  const id = request.body.id;
  const editNum: boolean = request.body.editNum;

  try {
    const result = await pool.query("update meetingpoint set editNum = ? where id = ?",
      [editNum, id]);
    response.status(200).send();
  } catch (err) {
    throw err;
  } 
});

// PUT phone
app.put('/api/updateNum/:id', async (request, response) => {
  const id = request.body.id;
  const phone: string = request.body.phone;
  const editNum: boolean = request.body.editNum;

  try {
    const result = await pool.query("update meetingpoint set phone = ?,\
      editNum = ? where id = ?",
      [phone, editNum, id]);
    response.status(200).send();
  } catch (err) {
    throw err;
  } 
});

// PUT firstname (switch (editNum))
app.put('/api/updatename/:id', async (request, response) => {
  const id = request.body.id;
  const editName: boolean = request.body.editName;

  try {
    const result = await pool.query("update meetingpoint set\
      editName = ? where id = ?",
      [editName, id]);
    response.status(200).json();
  } catch (err) {
    throw err;
  } 
});

// PUT firstname (validation)
app.put('/api/updatevalname/:id', async (request, response) => {
  const id = request.body.id;
  const firstname: string = request.body.firstname;
  const editName: boolean = request.body.editName;

  try {
    const result = await pool.query("update meetingpoint set\
      firstname = ?, editName = ? where id = ?",
      [firstname, editName, id]);
    response.status(200).send();
  } catch (err) {
    throw err;
  } 
});

// PUT email (validation)
app.put('/api/updatemail/:id', async (request, response) => {
  const id = request.body.id;
  const email: string = request.body.email;

  try {
    const result = await pool.query("update meetingpoint set\
      email = ? where id = ?",
      [email, id]);
    response.status(200).send();
  } catch (err) {
    throw err;
  } 
});


app.delete('/api/delete/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    const result = await pool.query('delete from meetingpoint where id = ?',
      [id]);
    response.status(204).json("Meeting deleted successfully !");
  } catch (err) {
    throw err;
  } 
});


/*app.get('/api/getAllPhone', async (request:Request, response:Response) => {
  try {
    const result = await pool.query("select * from phonecontact");
    response.status(200).send(result);
  } catch (err) {
    throw err;
  } 
});*/


//phonecontact Table
app.post('/api/createPhone', async (request:Request, response:Response) => {
  const id: number = request.body.id;
  const firstname: string = request.body.firstname;
  const lastname: string = request.body.lastname;
  const phone: string = request.body.phone;
  const email: string = request.body.email;
  const location: string = request.body.location;
  //console.log("ALL data", id, firstname, lastname, phone, email, location)
  
  try {
    const result = await pool.query('insert into phonecontact (id, firstname,\
      lastname, phone, email, location) values (?,?,?,?,?,?)',
      [id, firstname, lastname, phone, email, location]);
    response.status(201).json("New Phone Was Created !");
  } catch (err) {
    throw err;
  }
});

//Search by name phonecontact
app.get('/api/getByName', async (request:Request, response:Response) => {
  const lastname: string = request.body.lastname;
  try {
    const resultName = await pool.query("SELECT * FROM\
      phonecontact ORDER BY lastname ASC",
    [lastname]);
    response.status(200).json(resultName)
  } catch (error) {
    throw error
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
  console.log("ok-pass")
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
app.use('/api/getAllPhone', phonecontact)

app.listen(PORT, (): void => {
  console.log(`[+] Server is running on port ${PORT} !`)
});