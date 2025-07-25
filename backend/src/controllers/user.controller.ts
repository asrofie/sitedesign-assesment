import { Request, Response, NextFunction } from "express";
import { IPaginationQuery } from "../dto/pagination";
import { IUserLogin } from "../dto/user";
import {
  fetchUserPaginated,
  createUser,
  updateUser,
  deleteUser,
} from "../services/user.service";
import { IUser } from "../dto/user";
import ErrorResponse from "./error-response.controller";

export const fetchUserPaginatedController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const pagination = req.query as any as IPaginationQuery;
  let isSuccess: boolean = true;
  let message: string | null = null;
  let data: any | null = null;
  let responseCode: number = 200;
  try {
    data = await fetchUserPaginated(pagination);
  } catch (error: Error | any) {
    return ErrorResponse(error, res);
  }
  return res
    .status(responseCode)
    .json({ success: isSuccess, ...data, message });
};

export const initUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const dto: Partial<IUser> = req.body as Partial<IUser>;
  const user: IUserLogin = {
    id: "defaultadmin",
    name: "Admin",
    email: "admin@gmail.com",
  };
  let isSuccess: boolean = true;
  let message: string | null = null;
  let data: any | null = null;
  let responseCode: number = 200;
  try {
    data = await createUser(user, { ...user, password: "admin123!@#$" });
  } catch (error: Error | any) {
    return ErrorResponse(error, res);
  }
  return res.status(responseCode).json({ success: isSuccess, data, message });
};

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const dto: Partial<IUser> = req.body as Partial<IUser>;
  const user: IUserLogin = (req as any).user as IUserLogin;
  let isSuccess: boolean = true;
  let message: string | null = null;
  let data: any | null = null;
  let responseCode: number = 200;
  try {
    data = await createUser(user, dto);
  } catch (error: Error | any) {
    return ErrorResponse(error, res);
  }
  return res.status(responseCode).json({ success: isSuccess, data, message });
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const dto: Partial<IUser> = req.body as Partial<IUser>;
  const user: IUserLogin = (req as any).user as IUserLogin;
  let isSuccess: boolean = true;
  let message: string | null = null;
  let data: any | null = null;
  let responseCode: number = 200;
  try {
    data = await updateUser(user, dto);
  } catch (error: Error | any) {
    return ErrorResponse(error, res);
  }
  return res.status(responseCode).json({ success: isSuccess, data, message });
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { id } = req.body;
  const user: IUserLogin = (req as any).user as IUserLogin;
  let isSuccess: boolean = true;
  let message: string | null = null;
  let data: any | null = null;
  let responseCode: number = 200;
  try {
    data = await deleteUser(user, id);
  } catch (error: Error | any) {
    return ErrorResponse(error, res);
  }
  return res.status(responseCode).json({ success: isSuccess, data, message });
};
