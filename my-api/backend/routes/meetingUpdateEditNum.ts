import express, {Request, Response, NextFunction} from 'express';

const router = express.Router();

const pool = require('../dbConnection');

const connection = pool;

router.put('/', async (req:Request, res:Response, next:NextFunction) => {
  const id: number | null = req.body.id;
  const editNum: boolean = req.body.editNum;

  try {
    const result = await pool.query("update meetingpoint set editNum = ? where id = ?",
      [editNum, id]);
    res.status(200).send();
  } catch (err) {
    throw err;
  }
  next();
});

module.exports = router;

/*
console.dir(req.get('Content-Type'));
console.dir(req.is('application/json'));
console.log(req.accepts('application/json'));
console.log(req.is('application/json'));
console.log(req.body)
console.dir(req.params)
console.log(req.baseUrl)
console.dir(req.hostname)
console.dir(req.ip)
console.dir(req.originalUrl)
console.dir(req.path)
console.dir(req.protocol)
console.log(req.route)
console.dir(req.subdomains)
  res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
*/