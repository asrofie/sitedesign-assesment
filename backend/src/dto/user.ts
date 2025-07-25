export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  deleted_at?: Date | null;
}

export interface IUserLogin {
  id: string;
  name: string;
  email: string;
}
