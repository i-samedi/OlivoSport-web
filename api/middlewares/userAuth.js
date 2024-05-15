//importing modules
import express from 'express';
import { db, sequelize } from '../models/db.js';
//Assigning db.users to User variable
 export const User = db.users;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
 export const saveUser = async (req, res, next) => {
 //search the database to see if user exist
 try {
   const rut = await User.findOne({
     where: {
       rut: req.body.rut,
     },
   });
   //if username exist in the database respond with a status of 409
   if (rut) {
     return res.json(409).send("username already taken");
   }
   next();
 } catch (error) {
   console.log(error);
 }
};

//exporting module
