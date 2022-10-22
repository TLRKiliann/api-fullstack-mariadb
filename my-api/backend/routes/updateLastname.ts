import express, {Request, Response} from 'express';

const router = express.Router();

const pool = require('../dbConnection');

const connection = pool;

router.put('/', async (request:Request, response:Response) => {
  const id: number | null = request.body.id;
  const lastname: string = request.body.lastname;

  try {
    const result = await pool.query("update meetingpoint set lastname = ?\
      where id = ?",
      [lastname, id]);
    response.status(200).send();
  } catch (err) {
    throw err;
  } 
});

module.exports = router;




