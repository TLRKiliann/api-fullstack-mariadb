import express, {Request, Response, NextFunction} from 'express';

const router = express.Router();

const pool = require('../dbConnection');

const connection = pool;

router.post('/', async (req:Request, res:Response, next:NextFunction) => {
  const id: number | null = req.body.id;
  const datee: string = req.body.datee;
  const hour: string = req.body.hour;
  const location: string = req.body.location;
  const firstname: string = req.body.firstname;
  const lastname: string = req.body.lastname;
  const phone: string = req.body.phone;
  const email: string = req.body.email;
  const notice: string = req.body.notice;
  const editNum: boolean = req.body.editNum;
  const editName: boolean = req.body.editName;
  try {
    const result = await pool.query("insert into meetingpoint (id,\
      datee, hour, location,\
      firstname, lastname, phone, email, notice, editNum, editName)\
      values (?,?,?,?,?,?,?,?,?,?,?)",
    [id, datee, hour, location, firstname, lastname,
    phone, email, notice, editNum, editName]);
    res.status(201).json('New meeting created successfully');
  } catch (err) {
    throw err;
  }
  next();
});

module.exports = router;