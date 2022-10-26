import express, {Request, Response, NextFunction} from 'express';

const router = express.Router();

const pool = require('../dbConnection');

const connection = pool;

router.post('/', async (req:Request, res:Response, next:NextFunction) => {
  const id: number | null = req.body.id;
  const firstname: string = req.body.firstname;
  const lastname: string = req.body.lastname;
  const phone: string = req.body.phone;
  const email: string = req.body.email;
  const location: string = req.body.location;

  try {
    const result = await pool.query('insert into phonecontact (id, firstname,\
      lastname, phone, email, location) values (?,?,?,?,?,?)',
      [id, firstname, lastname, phone, email, location]);
    res.status(201).json("New Phone Was Created !");
  } catch (err) {
    throw err;
  }
  next();
});

module.exports = router;