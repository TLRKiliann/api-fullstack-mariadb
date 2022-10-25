# Agenda Map API

This API was made with React and TypeScript (front & Back) & mariadb (LAN) as database.

Advertissement :

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
- express
- mysql

SCHEMA of this app:

A request walkthrough this app as follow :

MeetingPoint.tsx > Services/meetingServices.ts (axios) > server.ts (express) > routes > mariadb

