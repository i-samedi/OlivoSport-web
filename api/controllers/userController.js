import bcrypt from 'bcrypt';
import {db} from '../models/db.js';
import jwt from 'jsonwebtoken';
const User = db.users;

export const signup = async (req, res) => {
  try {
    const { rut, password, tipo_de_usuario, nombre, apellido } = req.body;
    const data = {
      rut,
      password: await bcrypt.hash(password, 10),
      tipo_de_usuario,
      nombre,
      apellido,
    };
    //saving the user
    const user = await User.create(data);
 
    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });
 
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      //send users details
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
 };
 

export const login = async (req, res) => {
    try {
   const { rut, password } = req.body;
   
      //find a user by their email
      const user = await User.findOne({
        where: {
        rut: rut
      } 
        
      });
   
      //if user email is found, compare password with bcrypt
      if (user) {
        const isSame = await bcrypt.compare(password, user.password);
   
        //if password is the same
         //generate token with the user's id and the secretKey in the env file
   
        if (isSame) {
          let token = jwt.sign({ id: user.id }, process.env.secretKey, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          });
   
          //if password matches wit the one in the database
          //go ahead and generate a cookie for the user
          res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
          console.log("user", JSON.stringify(user, null, 2));
          console.log(token);
          //send user data
          return res.status(201).send(user);
        } else {
          return res.status(401).send("Authentication failed");
        }
      } else {
        return res.status(401).send("Authentication failed");
      }
    } catch (error) {
      console.log(error);
    }
   };
   