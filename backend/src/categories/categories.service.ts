import Category from "./categories.model";
import { CategoryBody } from "./categories.schema";

export const getAllCategories = async (userEmail: string) => {
  return await Category.findAll({
    where: {
      userEmail,
    },
  });
};

export const getCategoryByName = async (name: string) => {
  return await Category.findByPk(name);
};

export const createCategory = async (category: CategoryBody & { userEmail: string }) => {
  return await Category.create(category);
};

export const findOrCreateCategory = async (categoryName: string, userEmail: string) => {
  return await Category.findOrCreate({
    where: { name: categoryName, userEmail },
    defaults: {
      name: categoryName,
      userEmail,
    },
  });
};

export const deleteCategory = async (_id: string, userEmail: string) => {
  await Category.destroy({ where: { _id, userEmail } });
};
