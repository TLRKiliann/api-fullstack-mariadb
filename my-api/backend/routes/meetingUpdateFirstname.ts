import express, {Request, Response} from 'express';

const router = express.Router();

const pool = require('../dbConnection');

const connection = pool;

router.put('/', async (request:Request, response:Response) => {
  const id: number | null = request.body.id;
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

module.exports = router;