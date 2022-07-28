export interface UserSchema {
  active: boolean;
  createdAt: Date;
  email: string;
  updatedAt: Date;
  username: string;
  password: string;
}

export interface NoteSchema {
  _id: string;
  title: string;
  content: string;
  archived: boolean;
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
  categories: CategorySchema[];
}

export interface CategorySchema {
  _id: string;
  name: string;
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
  noteCategories: NoteCategoriesSchema;
}

export interface NoteCategoriesSchema {
  _id: string;
  noteId: string;
  categoryId: string;
  userEmail: string;
}

export interface RegisterType {
  email: string;
  username: string;
  password: string;
}

export interface LoginType extends Pick<Register, "email" | "password"> {}
