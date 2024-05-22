import bcrypt from 'bcrypt';
import {db} from '../models/db.js';
import jwt from 'jsonwebtoken';
const User = db.users;

export var perm;

export const login = async (req, res, next) => {
    try {
   const { rut, password } = req.body;
   
      //find a user by their email
      const user = await User.findOne({
        where: {
        rut: rut
      } 
        
    });
      //true or false
    
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
          perm = true;
          next();
          //send user data
         // return res.status(201)
        } else {
          perm = false;
          console.log('ERROR, USUARIO NO ENCONTRADO')

          res.redirect('/');
          //return res.status(401).send("Authentication failed");
        }
      } else {
        perm =false;
        console.log('ERROR, USUARIO NO ENCONTRADO')
        res.redirect('/');
        //return res.status(401).send("Authentication failed");

      }
    } catch (error) {
      console.log(error);
    }
   };
   