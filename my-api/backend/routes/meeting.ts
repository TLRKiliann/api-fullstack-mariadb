import express, {Request, Response} from 'express';

const router = express.Router();

const pool = require('../dbConnection');

const connection = pool;


router.get('/', async (req:Request,
  res:Response):Promise<void> => {
  try {
      const result = await pool.query("select * from meetingpoint");
      res.status(200).json(result);
  } catch (err) {
    throw err;
  }
});


module.exports = router;