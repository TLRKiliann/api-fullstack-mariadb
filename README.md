# Agenda Map API

## EN

This API was made with React and TypeScript (front & Back) & mariadb (LAN) as database.

I used the CRA, but it's not ideal in terms of resources and the node_modules is too heavy. 
Vite and pnpm are good alternatives. From now on I use it for the creation of my applications.

The frontend is not neat and there is too much state. However, I would like to point out that my 
goal was to make my application interact with a MySQL LAN server and to learn how to build a server with axios-express-nodejs-mysql.

## FR

J'ai utilisé le CRA, mais c'est pas idéale en termes de ressources et le node_modules est trop lourd. 
Vite et pnpm sont des alternatives de choix. Désormais c'est ce que j'utilise pour la création de mes applications.

Le frontend n'est pas soigné et il y a beaucoup trop de state. Cependant, je tiens à préciser que mon objectif
était de faire interagir mon application avec un serveur LAN MySQL et d'apprendre comment concevoir un serveur
avec axios-express-nodejs-mysql.

---

## Advertissement :

If you use a DB in LAN, you have to secure your client machine & server in LAN with ssh & firewall
that permit :

**for server:**
- to communicate only with your client machine by ssh:22 & MySQL:3306 

**for client:**
- to commmunicate only with your server by ssh:22 & MySQL:3306.

## About this API:

Front

- react-router-dom
- axios

Backend

- node
- nodemon
- express
- mariadb/mysql

## SCHEMA of this app

A request walkthrough this app as follow :

/src/Pages > Services (axios) > backend/server.ts (express) > backend/routes (express + mariadb)

