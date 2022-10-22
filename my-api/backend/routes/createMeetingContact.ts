import express, {Request, Response} from 'express';

const router = express.Router();

const pool = require('../dbConnection');

const connection = pool;

router.post('/', async (request:Request, response:Response) => {
  const id: number | null = request.body.id;
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

module.exports = router;