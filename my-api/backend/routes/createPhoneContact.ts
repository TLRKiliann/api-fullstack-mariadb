import express, {Request, Response} from 'express';

const router = express.Router();

const pool = require('../dbConnection');

const connection = pool;

router.post('/', async (request:Request, response:Response) => {
  const id: number | null = request.body.id;
  const firstname: string = request.body.firstname;
  const lastname: string = request.body.lastname;
  const phone: string = request.body.phone;
  const email: string = request.body.email;
  const location: string = request.body.location;

  try {
    const result = await pool.query('insert into phonecontact (id, firstname,\
      lastname, phone, email, location) values (?,?,?,?,?,?)',
      [id, firstname, lastname, phone, email, location]);
    response.status(201).json("New Phone Was Created !");
  } catch (err) {
    throw err;
  }
});

module.exports = router;