import express, {Request, Response, NextFunction} from 'express';

const router = express.Router();

const pool = require('../dbConnection');

const connection = pool;

router.put('/', async (req:Request, res:Response, next:NextFunction) => {
  const id: number | null = req.body.id;
  const phone: string = req.body.phone;
  const editNum: boolean = req.body.editNum;

  try {
    const result = await pool.query("update meetingpoint set phone = ?,\
      editNum = ? where id = ?",
      [phone, editNum, id]);
    res.status(200).send();
  } catch (err) {
    throw err;
  }
  next();
});

module.exports = router;






