export interface UserSchema {
  active: boolean;
  createdAt: Date;
  email: string;
  updatedAt: Date;
  username: string;
  password: string;
}

export interface RegisterType {
  email: string;
  username: string;
  password: string;
}

export interface LoginType extends Pick<Register, "email" | "password"> {}
