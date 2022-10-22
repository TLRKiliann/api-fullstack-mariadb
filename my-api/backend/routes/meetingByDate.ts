import express, {Request, Response} from 'express';

const router = express.Router();

const pool = require('../dbConnection');

const connection = pool;

router.get('/', async(request:Request,
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

module.exports = router;