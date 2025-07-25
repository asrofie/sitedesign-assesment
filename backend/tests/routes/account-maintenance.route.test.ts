import { describe, it, expect, beforeAll } from "@jest/globals";
import axios from "axios";

const createAxiosInstance = async (): Promise<any> => {
  const BASE_URL = "http://localhost:5000/api/v1";
  const loginInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  let BEARER_TOKEN = "xxx";
  try {
    const response = await loginInstance.post("/auth/login", {
      identifier: "ericpapasit",
      password: "123456",
    });
    if (response.data) {
      BEARER_TOKEN = response.data.data.token;
    }
  } catch (error) {
    console.log(error);
  }
  return axios.create({
    baseURL: BASE_URL + "/account",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
};

let axiosInstance: any;
const testOrgId = 1333;
let createdAccountMaintenanceId: number | null = null;
const testAccountId = 1;
const testMaintenanceTypeId = 1;
const testMaintenancePeriodId = 1;

const createTestAccountMaintenance = (overrides: any = {}): any => ({
   account_id: testAccountId,
  maintenance_type_id: testMaintenanceTypeId,
  rate: 100.5,
  start_date: new Date(),
  end_date: new Date(Date.now() + 86400000),
  maintenance_period_id: testMaintenancePeriodId,
  type: "Routine",
  ...overrides,
});

describe("Account Maintenance Routes", () => {
  beforeAll(async () => {
    axiosInstance = await createAxiosInstance();
  });

  it("should get account maintenance (paginated)", async () => {
    let response: any = null;
    try {
      response = await axiosInstance.post(
        "/account-maintenance/get-account-maintenance",
        {
          org_id: testOrgId,
          account_id: testAccountId,
        },
      );
    } catch (error) {
      console.log("error account maintenance get", error);
    }
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("success", true);
    expect(response.data).toHaveProperty("data");
  });

  it("should create a new account maintenance", async () => {
    const payload = createTestAccountMaintenance();
    const response = await axiosInstance.post("/account-maintenance", {
      org_id: testOrgId,
      ...payload,
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("success", true);
    expect(response.data).toHaveProperty("data");
    createdAccountMaintenanceId = response.data.data?.id || null;
  });

  it("should update an account maintenance", async () => {
    if (!createdAccountMaintenanceId) {
      expect(createdAccountMaintenanceId).not.toBeNull();
      return
    };
    const payload = createTestAccountMaintenance({
      id: createdAccountMaintenanceId,
      name: "Updated Account Maintenance",
      description: "Updated account maintenance description",
    });
    const response = await axiosInstance.put("/account-maintenance", {
      org_id: testOrgId,
      ...payload,
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("success", true);
  });

  it("should delete an account maintenance", async () => {
    if (!createdAccountMaintenanceId) {
      expect(createdAccountMaintenanceId).not.toBeNull();
      return
    };
    const payload = {
      org_id: testOrgId,
      account_id: testAccountId,
      id: createdAccountMaintenanceId,
    };
    const response = await axiosInstance.post(
      "/account-maintenance/delete-account-maintenance",
      payload,
    );
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("success", true);
  });
});
