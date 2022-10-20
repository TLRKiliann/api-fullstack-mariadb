# BACKEND AGENDA MAP

Backend modules : 

**express - mariadb - cors - dotenv - TypeScript**

---

## INSTALL

└─ $ ▶ npm init

JSON-SERVER

(index.js) => server.ts

└─ $ ▶ npm install --save-dev json-server (uninstalled)

└─ $ ▶ npm install --save-dev nodemon

TYPESCRIPT

└─ $ ▶ npm install -g typescript

└─ $ ▶ tsc --version
//Version 4.8.4

└─ $ ▶ tsc --init (or npx tsc --init)

└─ $ ▶ npm install -D typescript

└─ $ ▶ npm install -D @types/node

└─ $ ▶ npm install -D @types/express

└─ $ ▶ npm install -D ts-node


(package.json)

```
	"start": "node server.js",
	"dev": "nodemon server.js",
	"server": "json-server -p3001 --watch db.json"
```

**CMD Line**

└─ $ ▶ npm start (server.js)

└─ $ ▶ npm run dev (server.js restart in every changes)

└─ $ ▶ npm run server (db.json restart in every changes)

---

## INSTALL (suite)

└─ $ ▶ npm install express

└─ $ ▶ npm install --save mariadb

└─ $ ▶ npm install --save body-parser (not necessary app.use(express.json()) is enough)

└─ $ ▶ npm install --save dotenv

└─ $ ▶ npm install cors

bcrypt (dosen't work with mariadb and MySQL (overload server during search & decrypt all hash))

sequelize is ORM so we should paid attention with ORM.

jwt json web token for more security.

---

## Access-Control-Allow-... for headers

```
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4002');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
```

---

## Connection sever with dotenv

server.js

```
dotenv.config();
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  //port: process.env.DB_PORT,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
    if (err){
      console.log(err)
    }
    else
    {
      console.log("Database connected!")
    }
});
```

.env

```
DB_HOST: "ip_of_server (LAN)"
DB_PORT: 3306
DB_USER: "user"
DB_PWD: "mypasswd"
DB_DATABASE: "mytable"
```

---

# MySQL Tables on Server LAN (raspberry pi 4)

Security: protected by ssh and firewall that only permit my client machine to connect.

LOGIN

```
MariaDB [mytable]> DESC loggers;
+----------+--------------+------+-----+---------+-------+
| Field    | Type         | Null | Key | Default | Extra |
+----------+--------------+------+-----+---------+-------+
| id       | int(11)      | NO   | PRI | NULL    |       |
| name     | varchar(255) | NO   |     | NULL    |       |
| email    | varchar(255) | NO   |     | NULL    |       |
| password | varchar(255) | NO   |     | NULL    |       |
+----------+--------------+------+-----+---------+-------+
4 rows in set (0.005 sec)
```

---

PHONECONTACT

```
MariaDB [mytable]> DESC phonecontact;
+-----------+--------------+------+-----+---------+-------+
| Field     | Type         | Null | Key | Default | Extra |
+-----------+--------------+------+-----+---------+-------+
| id        | int(11)      | NO   | PRI | NULL    |       |
| firstname | varchar(255) | YES  |     | NULL    |       |
| lastname  | varchar(255) | YES  |     | NULL    |       |
| phone     | varchar(255) | YES  |     | NULL    |       |
| email     | varchar(255) | YES  |     | NULL    |       |
| location  | varchar(255) | YES  |     | NULL    |       |
+-----------+--------------+------+-----+---------+-------+
6 rows in set (0.004 sec)

```

---

MEETINGPOINT

```
MariaDB [mytable]> DESC meetingpoint;
+-----------+--------------+------+-----+---------+-------+
| Field     | Type         | Null | Key | Default | Extra |
+-----------+--------------+------+-----+---------+-------+
| id        | int(11)      | NO   | PRI | NULL    |       |
| datee     | varchar(255) | YES  |     | NULL    |       |
| hour      | varchar(255) | YES  |     | NULL    |       |
| location  | varchar(255) | YES  |     | NULL    |       |
| firstname | varchar(255) | YES  |     | NULL    |       |
| lastname  | varchar(255) | YES  |     | NULL    |       |
| phone     | varchar(255) | YES  |     | NULL    |       |
| email     | varchar(255) | YES  |     | NULL    |       |
| notice    | varchar(255) | YES  |     | NULL    |       |
| editNum   | tinyint(1)   | YES  |     | NULL    |       |
| editName  | tinyint(1)   | YES  |     | NULL    |       |
+-----------+--------------+------+-----+---------+-------+
11 rows in set (0.005 sec)

```

FORMATTING DATE

```
app.get('/api/getByDateHour', async(request:Request,
  response:Response):Promise<void> => {
  try {
    const result = await pool.query("SELECT *, STR_TO_DATE(datee, '%d-%m-%Y'\
      GET_FORMAT(DATE, 'EUR')) FROM meetingpoint\
      ORDER BY datee ASC");
    response.status(200).json(result);
  } catch (err) {
    throw err;
```


## Error Handling

console.log(), typeof, console & browser network is useful, but more efficiently using appropriate error handlers allows to see and learn more about the origin of errors between axios & express and the db.

- App.js

```
  const handleSaveAppointment = (event: React.FormEvent) => {
    event.preventDefault();
    const dataObject = {
      id: generateId(),
      datee: datee,
      hour: hour,
      location: location,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      notice: notice,
      editNum: false,
      editName: false
    }

    meetingServices
      .create(dataObject)
      .then(returnData => {
        setDatas(datas.concat(dataObject))
      })
      .catch((error) => {
        console.log("error with create new appointment !")
        setDatas([])
      })
    alert(`Data saved OK !`);
    setCreatNewMeeting(false);
  };
```

- Services :

```
const createPhone = (formData: any) => {
  const request = app.post<any>(postUrl, formData)
  return request.then((response: any) => response.data)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response Delete:");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
  });
};
```

- Server

Express handling errors.

```
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

```
app.get('/notes', (req,res) => {
  const note = notes.map(note => {
    return console.log(note, typeof note, id, typeof id, note.id === id)
    })
});
```

```
app.get('/', (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error('BROKEN')
    } catch (err) {
      next(err)
    }
  }, 100)
})
```

```
app.get('/', (req, res, next) => {
  Promise.resolve().then(() => {
    throw new Error('BROKEN')
  }).catch(next) // Errors will be passed to Express.
})
```

Don't use console.log() just before a request ! That's ok if you practice as follow : 

```
app.post('/api/createPhone', async (request:Request, response:Response) => {
  const id: number = request.body.id;
  const firstname: string = request.body.firstname;
  const lastname: string = request.body.lastname;
  const phone: string = request.body.phone;
  const email: string = request.body.email;
  const location: string = request.body.location;
  console.log("ALL data", id, firstname, lastname, phone, email, location)
  
  /*
  try {
    const result = await pool.query('insert into phonecontact (id, firstname,\
      lastname, phone, email, location) values (?,?,?,?,?,?)',
      [id, firstname, lastname, phone, email, location]);
    response.status(201).json("New Phone Was Created !");
  } catch (err) {
    throw err;
  }*/
});
```