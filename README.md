# Expense-Tracker
A web application which help people record their expense and determine how to use money. The web application is based on Express.js server

## Screentshots
### Login Page
![Login Page](https://res.cloudinary.com/dqfxgtyoi/image/upload/v1641627481/github/expense-tracker/loginPage_qwygkd.png)
### Register Page
![Register Page](https://res.cloudinary.com/dqfxgtyoi/image/upload/v1641627491/github/expense-tracker/registerPage_masehf.png)
### Index Page
![Index Page](https://res.cloudinary.com/dqfxgtyoi/image/upload/v1641627474/github/expense-tracker/indexPage_xi8qku.png)
### Show Category Page
![Show Category Page](https://res.cloudinary.com/dqfxgtyoi/image/upload/v1641627475/github/expense-tracker/viewPage_wykqjp.png)
### Edit Page
![Edit Page](https://res.cloudinary.com/dqfxgtyoi/image/upload/v1641627473/github/expense-tracker/editPage_q0qqao.png)
### Deletion Page
![Deletion Page](https://res.cloudinary.com/dqfxgtyoi/image/upload/v1641627476/github/expense-tracker/deletePage_qamysn.png)
### Creation Page
![Creation Page](https://res.cloudinary.com/dqfxgtyoi/image/upload/v1641627475/github/expense-tracker/createPage_btoadl.png)

## Features
1. View all expense info.
2. View some expense info via selecting a category
3. Create expense info you want to record
5. Delete expense info
6. Login in with your account
7. Register a new account for youself

## Requirement
1. Node.js (v14.18.1 is recommended)
2. Mongoose (v6.1.4 is recommended)
3. MongoDB (v4.1.4 is recommended)


## Installation
1.  Open your terminal, run git clone to copy it to your platform
```
git clone https://github.com/Eklipsorz/expense-tracker.git
```

2. Change current directory to expense-tracker
```
cd expense-tracker
```

3. Install required npm modules
```
npm install
```

4. Open your MongoDB server (port:27017) and create a database called expense-tracker


5. Go back to expense-tracker dir and generate a set of seed data for MongoDB database 
```
npm run seed
```

## Quick start
1. Start the web app
```
npm run start
```

2. If you want to develop this project, you can run development mode. (BTW, you might require nodemon)
```
npm run dev
```

3. Open your browser and input the following url

```
http://localhost:3000/
```

## Contributor
[orion (Eklipsorz)](https://github.com/Eklipsorz)