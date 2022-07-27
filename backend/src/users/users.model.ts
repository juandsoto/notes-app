import { DataTypes } from "sequelize";
import Category from "../categories/categories.model";
import sequelize from "../utils/db";
import Note from "../notes/notes.model";
import NoteCategories from "../noteCategories/noteCategories.model";
import { hashPassword } from "../utils/jwt";

const User = sequelize.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 3,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6,
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    hooks: {
      beforeCreate: async (user: any) => {
        if (user.password) {
          user.password = await hashPassword(user.password);
        }
      },
      beforeUpdate: async user => {
        if (user.password) {
          user.password = await hashPassword(user.password);
        }
      },
    },
  }
);

User.hasMany(Note, { foreignKey: "userEmail" });
User.hasMany(Category, { foreignKey: "userEmail" });
User.hasMany(NoteCategories, { foreignKey: "userEmail" });

Note.belongsTo(User);
Category.belongsTo(User);

Note.belongsToMany(Category, {
  through: NoteCategories,
});
Category.belongsToMany(Note, {
  through: NoteCategories,
});
Category.belongsTo(User);

export default User;
