import prisma from "../config/prisma";
import { IPaginationQuery } from "../dto/pagination";
import { IUser, IUserLogin } from "../dto/user";
import bcrypt from "bcryptjs";

const SelectQueryUser = {
  id: true,
  name: true,
  email: true,
};

function mapToDto(data: any): IUser {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
  };
}

export const fetchUser = async (): Promise<IUser[]> => {
  const data = await prisma.user.findMany({
    select: SelectQueryUser,
  });
  return data.map(mapToDto);
};

export const fetchUserPaginated = async (
  pagination: IPaginationQuery,
): Promise<{ data: IUser[]; pagination: any }> => {
  const { page, sort, sort_by, limit } = pagination;
  const skip = page && page > 0 ? (page - 1) * limit : 0;
  let orderBy: any = {};
  if (sort_by && sort) {
    orderBy[sort_by] = sort;
  } else {
    orderBy = { id: "asc" };
  }
  const [data, totalCount] = await prisma.$transaction([
    prisma.user.findMany({
      select: SelectQueryUser,
      take: limit,
      skip,
      orderBy,
    }),
    prisma.user.count(),
  ]);
  return {
    data: data.map(mapToDto),
    pagination: {
      total: totalCount,
      page,
      limit,
      total_pages: Math.ceil(totalCount / limit),
    },
  };
};

const createInput = (dto: Partial<IUser>): any => {
  let data: any = {};
  if (dto.name) {
    data.name = dto.name;
  }
  if (dto.email) {
    data.email = dto.email;
  }
  return data;
};

const checkEmailExist = async (
  email: string,
): Promise<Partial<IUser> | null> => {
  return await prisma.user.findFirst({
    where: { email },
    select: { id: true },
  });
};

export const createUser = async (
  user: IUserLogin,
  dto: Partial<IUser>,
): Promise<IUser> => {
  // chec email exist
  if (dto.email) {
    const emailExist = await checkEmailExist(dto.email);
    if (emailExist) {
      throw new Error("Email already exists");
    }
  }
  const now = new Date();
  let data = createInput(dto);
  if (dto.password) {
    data.password = await bcrypt.hash(dto.password, 10);
  }
  data.created_at = now;
  data.created_by = user.id;
  const result = await prisma.user.create({
    data,
    select: SelectQueryUser,
  });
  return mapToDto(result);
};

export const updateUser = async (
  user: IUserLogin,
  dto: Partial<IUser>,
): Promise<IUser> => {
  const now = new Date();
  await prisma.user.findUniqueOrThrow({
    where: { id: dto.id },
    select: { id: true },
  });
  if (dto.email) {
    const emailExist = await checkEmailExist(dto.email);
    if (emailExist && dto.id !== emailExist.id) {
      throw new Error("Email already exists");
    }
  }
  let data = createInput(dto);
  if (dto.password) {
    const samePassword = await bcrypt.compare(dto.password, dto.password);
    if (!samePassword) {
      data.password = await bcrypt.hash(dto.password, 10);
    }
  }
  data.modified_at = now;
  data.modified_by = user.id;
  const result = await prisma.user.update({
    where: { id: dto.id },
    data,
    select: SelectQueryUser,
  });
  return mapToDto(result);
};

export const deleteUser = async (
  user: IUserLogin,
  user_id: string,
): Promise<string> => {
  const existing = await prisma.user.findUniqueOrThrow({
    where: { id: user_id },
    select: { id: true, email: true },
  });
  const timestamp = new Date();
  await prisma.user.update({
    data: {
      deleted_at: new Date(),
      email: existing.email + "-" + timestamp.toISOString(),
    },
    where: { id: user_id },
  });
  return user_id;
};
