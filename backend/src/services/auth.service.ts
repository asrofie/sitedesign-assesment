import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.util";
import prisma from "../config/prisma";

export const authenticateUser = async (
  email: string,
  password: string,
): Promise<Record<string, any> | null> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
      },
    });

    if (!user) return null; // User not found

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    const token = generateToken({ id: user.id, email: user.email });
    if (!token) return null; // Token generation failed
    return {
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    };
  } catch (error) {
    throw error;
  }
};
