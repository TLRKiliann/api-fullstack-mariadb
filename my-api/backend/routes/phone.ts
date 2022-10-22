import express, {Request, Response} from 'express';

const router = express.Router();

const pool = require('../dbConnection');

const connection = pool;

router.get('/', async (request:Request, response:Response) => {
  try {
    const result = await pool.query("select * from phonecontact");
    response.status(200).send(result);
  } catch (err) {
    throw err;
  } 
});

module.exports = router;