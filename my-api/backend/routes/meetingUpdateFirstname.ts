import express, {Request, Response, NextFunction} from 'express';

const router = express.Router();

const pool = require('../dbConnection');

const connection = pool;

router.put('/', async (req:Request, res:Response, next:NextFunction) => {
  const id: number | null = req.body.id;
  const firstname: string = req.body.firstname;
  const editName: boolean = req.body.editName;

  try {
    const result = await pool.query("update meetingpoint set\
      firstname = ?, editName = ? where id = ?",
      [firstname, editName, id]);
    res.status(200).send();
  } catch (err) {
    throw err;
  }
  next();
});

module.exports = router;