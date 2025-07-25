<script lang="ts" setup>
import { addUser, deleteUser, fetchUsers, updateUser } from '@src/service/user';

const authStore = useAuthStore();
const handleLogout = async () => {
  await authStore.logout();
}
const loading = ref<boolean>(false);
const modeForm = ref<boolean>(false);
const users = ref<any[]>([]);
const error = ref<any>(false);
const form = ref({
  id: 'xxx',
  email: '',
  password: '',
  name: '',
})

const resetForm = () => {
  return {
    id: 'xxx',
    email: '',
    password: '',
    name: '',
  }
};

const getUsers = async () => {
  loading.value = true;
  try {
    const res = await fetchUsers();
    if (res.success) {
      users.value = res.data;
    } else {
      error.value = res.message;
    }
  } catch (error) {
    console.log("error", error);
  }
  loading.value = false;
}
onMounted(async () => {
  const isAuthenticated = authStore.checkLogin();
  if (!isAuthenticated) {
    navigateTo("/")
    return true;
  }
  await getUsers();
});
const handleDeleteUser = async (id: string) => {
  loading.value = true;
  try {
    const res = await deleteUser({id});
    if (res.success) {
      await getUsers();
    } else {
      error.value = res.message;  
    }
  } catch (error) {
    console.log("error", error);
  }
  await getUsers();
}
const changeModeForm = (val: boolean, user: any = null) => {
  modeForm.value = val;
  if (user) {
    form.value = user;
  }
}
const handleUpdateUser = async () => {
  if (form.value.id === 'xxx') {
    await handleAddUser();
    return;
  }
  loading.value = true;
  try {
    const res = await updateUser(form.value);
    if (res.success) {
      await getUsers();
      changeModeForm(false);
    } else {
      error.value = res.message;
    }
  } catch (err) {
    error.value = "Something went wrong";
  }
  loading.value = false;
}
const handleAddUser = async () => {
  loading.value = true;
  try {
    let data = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password
    };
    const res = await addUser(data);
    if (res.success) {
      await getUsers();
      changeModeForm(false);
    } else {
      error.value = res.message;
    }
  } catch (err) {
    error.value = "Something went wrong";
  }
  loading.value = false;
}
</script>
<template>
  <div class="container-fluid">
    <!-- Topbar -->
    <div class="row border-bottom border-black">
      <div class="col d-flex justify-content-between align-items-center p-2">
        <span class="fw-bold">LOGO APP</span>
        <button @click="handleLogout" class="btn btn-outline-danger rounded-0" type="button"><i class="fa-solid fa-bars"></i> <span>Logout</span></button>
      </div>
    </div>

    <div class="row">
      <!-- Sidebar -->
      <div class="col-md-2 border-end border-black p-3" style="min-height: calc(100vh - 56px)">
        <div class="d-flex flex-column">
          <span class="fw-bold mb-3">Dashboard</span>
          <span class="fw-bold">User Management</span>
        </div>
      </div>

      <!-- Main Content -->
      <div v-if="!modeForm" class="col-md-10 p-3">
        <h5 class="mb-3">User List</h5>
        <button
            :disabled="loading"
            type="button"
            class="btn btn-outline-primary mb-2 rounded-0"
            @click="changeModeForm(true, resetForm())"
          >
            + Add User
          </button>
        <table class="table table-bordered border-black">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="5">loading</td>
            </tr>
            <tr v-else-if="users.length > 0" v-for="(user, index) in users" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.deleted_at === null ? 'Active' : 'Inactive' }}</td>
              <td>
                <button @click="changeModeForm(true, user)" class="btn btn-sm btn-outline-warning me-1 rounded-0">update</button>
                <button @click="handleDeleteUser(user.id)" class="btn btn-sm btn-outline-danger rounded-0">delete</button>
              </td>
            </tr>
            <tr v-else-if="!loading && !users || users.length === 0">
              <td colspan="5">No Data</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="modeForm" class="col-md-10 p-3">
        <h5 class="mb-3">{{ form.id === 'xxx' ? 'Add User' : 'Edit User' }}</h5>
        <div v-if="modeForm && error" class="alert-warning alert-dismissible fade show">{{ error }}></div>
        <form class="space-y-4" @submit.prevent="handleUpdateUser">
          <input type="hidden" v-model="form.id"></input>
          <div class="form-group mb-2">
            <label class="form-label block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="form.name"
              type="name"
              class="form-control w-auto px-4 py-2 border border-gray-300 rounded-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
              :disabled="loading"
            >
          </div>
          <div class="form-group mb-2">
            <label class="form-label block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="form-control w-auto px-4 py-2 border border-gray-300 rounded-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              :disabled="loading"
            >
          </div>
          <div class="form-group mb-2">
            <label class="form-label block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="form.password"
              type="password"
              class="form-control w-auto px-4 py-2 border border-gray-300 rounded-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              :disabled="loading"
            >
          </div>
          <div class="form-group w-auto mb-2 flex flex-row justify-between items-center">
            <button
              :disabled="loading"
              type="submit"
              class="form-control w-auto btn btn-outline-success me-2 rounded-0"
            >
              {{ form.id === 'xxx' ? 'Add User' : 'Update User'  }}
            </button>
            <button
              :disabled="loading"
              type="reset"
              class="form-control w-auto btn btn-outline-danger rounded-0"
              @click="changeModeForm(false)"
            >
              Back to List
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
.border-black {
  border-color: black !important;
}
</style>