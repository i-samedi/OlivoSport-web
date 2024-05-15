import Sequelize from "sequelize";

export const sequelize = new Sequelize("olivossport", "postgres", "91213399..", {
  host: "localhost",
  dialect: "postgres",
});

export const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

import userModel from './usermodel.js';
import { DataTypes } from "sequelize";

db.users = userModel(sequelize, DataTypes);

