import { DataTypes } from "sequelize";
import Category from "../categories/categories.model";
import sequelize from "../utils/db";
import Note from "../notes/notes.model";
import User from "../users/users.model";

const NoteCategories = sequelize.define(
  "noteCategories",
  {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    noteId: {
      type: DataTypes.UUID,
      references: {
        model: Note,
        key: "_id",
      },
    },
    categoryId: {
      type: DataTypes.UUID,
      references: {
        model: Category,
        key: "_id",
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
  { timestamps: false, freezeTableName: true }
);

export default NoteCategories;
