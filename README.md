# sitedesign-assesment
A assesment project
## Backend
Located in backend directory
It uses prisma that requires to use replica mode on MongoDB
https://www.prisma.io/docs/orm/overview/databases/mongodb#replica-set-configuration
In windows, you need to run via command line with following steps:
```sh
- create a directory C:\mongodb\single-replica
- start mongodb with this command 

mongod --replSet rs0 --port 27017 --dbpath "C:\mongodb\replica-data"
```
To run project
```sh
npm install
npm run dev
```
API Doc [localhost:5000/api-docs](http://localhost:5000/api/v1/api-docs)<br>
API HOST [http://localhost:5000/api/v1](http://localhost:5000/api/v1)<br>
To create default user: http://localhost:5000/api/v1/auth/init <br>
Default user<br>
```js
email: admin@gmail.com
password: admin123!@#$
```
## Frontend
Located in frontend directory
To run project
```sh
npm install
npm run dev
```
Web [localhost:3000](http://localhost:3000)<br>

# Thank you