import { DataTypes } from "sequelize";
import User from "../users/users.model";
import sequelize from "../utils/db";

const Note = sequelize.define(
  "note",
  {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3,
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
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

export default Note;
