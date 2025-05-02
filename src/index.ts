const express = require('express')
const app = express()
const port = 3000
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

app.get('/',async (req:any, res:any) => {
 
  const allUsers = await prisma.user.findMany();
  console.log('All users:', allUsers);
  res.send(allUsers)
})

app.post("/",async (req:any,res:any)=>{
  const user = await prisma.user.create({
    data: { username: 'alice@example.com'+Math.random().toString(), password: 'Alice'+Math.random().toString() },
  });
  res.send(user)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
