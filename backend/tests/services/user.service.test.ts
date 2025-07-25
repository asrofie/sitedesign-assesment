import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "@jest/globals";
import prisma from "../../src/config/prisma";
import { IUserLogin } from "../../src/dto/user";
import { IUser } from "../../src/dto/user";
import { createUser, updateUser, deleteUser, fetchUserPaginated, fetchUser } from "../../src/services/user.service";

const testUser: IUserLogin = {
  id: "xxaa",
  name: "testuser",
  email: "test@example.com",
};

let createdUserIds: string[] = [];

const cleanupTestData = async (): Promise<void> => {
  if (createdUserIds.length > 0) {
    await prisma.user.deleteMany({
      where: { id: { in: createdUserIds } },
    });
  }
};

describe("UserService Integration Tests", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await cleanupTestData();
    createdUserIds = [];
  });

  afterEach(async () => {
    await cleanupTestData();
  });

  const createTestUser = (
    overrides: Partial<IUser> = {},
  ): Partial<IUser> => ({
    name: "Joen Doe",
    email: "joenDoe@gmail.com",
    password: "password123",
    ...overrides,
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const dto = createTestUser();
      const created = await createUser(testUser, dto);
      const result = await prisma.user.findUnique({
        where: { id: created.id },
      });
      if (!result) {
        expect(result).toBeDefined();
        return;
      }
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe(dto.name);
      expect(result.email).toBe(dto.email);
      expect(result.password).not.toEqual(dto.password);
      createdUserIds.push(result.id);
    });
  });

  describe("updateUser", () => {
    it("should update an existing user", async () => {
      const created = await createUser(
        testUser,
        createTestUser(),
      );
      createdUserIds.push(created.id);
      const updatedDto: Partial<IUser> = {
        id: created.id,
        name: "Joen Doe-edit",
        email: "joenDoe-edit@gmail.com",
      };
      const result = await updateUser(testUser, updatedDto);
      expect(result.id).toBe(created.id);
      expect(result.name).toBe(updatedDto.name);
      expect(result.email).toBe(updatedDto.email);
    });
  });

  describe("fetchUser", () => {
    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const created = await createUser(
          testUser,
          createTestUser({ name: "user" + i }),
        );
        createdUserIds.push(created.id);
      }
    });
    it("should fetch all user for an account", async () => {
      const result = await fetchUser();
      expect(result.length).toBeGreaterThanOrEqual(3);
      result.forEach((item) => {
        expect(item.id).toBeDefined();
        expect(item.name).toBeDefined();
        expect(item.email).toBeDefined();
        expect(item.password).toBeDefined();
      });
    });
  });

  describe("fetchUserPaginated", () => {
    beforeEach(async () => {
      for (let i = 0; i < 5; i++) {
        const created = await createUser(
          testUser,
          createTestUser({ name: "user" + i }),
        );
        createdUserIds.push(created.id);
      }
    });
    it("should fetch user paginated", async () => {
      const pagination = {
        page: 1,
        limit: 2,
        sort_by: "id",
        sort: "asc",
        search: "",
      };
      const result = await fetchUserPaginated(
        pagination,
      );
      expect(result.data.length).toBe(2);
      expect(result.pagination.total).toBeGreaterThanOrEqual(5);
      expect(result.pagination.page).toBe(1);
      expect(result.pagination.limit).toBe(2);
      expect(result.pagination.total_pages).toBeGreaterThanOrEqual(3);
    });
  });

  describe("deleteUser", () => {
    it("should soft delete an user", async () => {
      const created = await createUser(
        testUser,
        createTestUser(),
      );
      createdUserIds.push(created.id);
      const resultId = await deleteUser(testUser, created.id);
      expect(resultId).toBe(created.id);
      const updated = await prisma.user.findUnique({
        where: { id: created.id, deleted_at: null },
      });
      expect(updated).toBeNull();
    });
  });
});
