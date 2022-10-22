import express, {Request, Response} from 'express';

const router = express.Router();

const pool = require('../dbConnection');

const connection = pool;

router.get('/', async (request:Request, response:Response) => {
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

module.exports = router;