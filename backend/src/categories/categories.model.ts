import { DataTypes } from "sequelize";
import User from "../users/users.model";
import sequelize from "../utils/db";

const Category = sequelize.define(
  "category",
  {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
      },
    },
    userEmail: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "email",
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

export default Category;
