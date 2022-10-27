# FRONTEND AGENDA MAP

API-FULLSTACK_MARIADB was made by CRA + TypeScript :

└─ $ ▶ npx create-react-app my-api --template typescript

It's a CRA. So nth-check present vulnerabilties. To resolve that error, you can remove "react-scripts": "5.0.1" from `dependencies` to `devDependencies` in `package.json` file. (I believe that I've found this info on stack-overflow with error nth-check).

(package.json):

  "devDependencies": {
    "react-scripts": "5.0.1", <--- right place for react-script.
  }

---

## INSTALL

└─ $ ▶ npm install axios (to communicate with express in backend)

└─ $ ▶ npm install --save react-router-dom

└─ $ ▶ npm install --save-dev sass

└─ $ ▶ npm install react-icons --save

- Then:

└─ $ ▶ npm start

└─ $ ▶ set HTTPS=true&&npm start

---

## TESTING with Jest & TS

- Create __tests__ folder in parallel as your script.
- Create file for testing `../Components/__tests__/Login.test.tsx` for
  `../Components/Login.tsx`
- Create file Login.spec.tsx in __tests__ folder.


└─ $ ▶ npm install --save-dev jest ts-jest @types/jest

└─ $ ▶ npm install --save-dev @babel/preset-typescript

└─ $ ▶ npm install --save-dev react-test-renderer

└─ $ ▶ npm install --save-dev @testing-library/react

**Create file jest.config.js with this command :**

└─ $ ▶ npx ts-jest config:init

You can althought install extra module with :
(└─ $ ▶ npm install --save-dev jest-styled-components)

API .toMatchSnapshot()

```
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

└─ $ ▶ npm run test

└─ $ ▶ npm run test --code--coverage

└─ $ ▶ npm install coverage

└─ $ ▶ CI=true npm test

└─ $ ▶ npm test -- --coverage

└─ $ ▶ npm test `-- --coverage --collectCoverageFrom="./src/**"`

---

## My favorites

└─ $ ▶ npm run test

└─ $ ▶ npm run test --code--coverage

└─ $ ▶ npm test -- --coverage

---

The PUT method annoyed me, because it was very difficult to identify problems between typescript, axios, LAN, mariadb and mysql...

Then I proceed like this to catch the error with console.log(). I also used browser console and network for status.

```
//PUT
const updateNum = async (id: number, changePhone: any) => {
  let request = null;
  try {
    const request = app.put<any>(`${putUrl}/${id}`, changePhone);
    await request.then((response: any) => response.data)
  } catch (err: any) {
      console.error("Error response:");
      console.error("erd", err.response.data);    // ***
      console.error("ers", err.response.status);  // ***
      console.error("erh", err.response.headers); // ***
      throw err;
  } finally {
    console.log("request", request);
  }
  //return await request.then((response: any) => console.log(response.data));
  //console.log("data request", request.data)
};
```
---