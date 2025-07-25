<script lang="ts" setup>
import { addUser, updateUser } from '@src/service/user';

const emit = defineEmits<{
  (e: 'onBack'): void;
}>();
const modelvalue = defineModel<any>();
const loading = ref<boolean>(false);
const error = ref<any>(false);
const success = ref<string | null>(null);

const handleBack = () => {
  emit('onBack');
}

watch(() => modelvalue, (newVal) => {
  console.log("newVal", newVal);
  modelvalue.value = newVal;
});

const handleUpdateUser = async () => {
  if (modelvalue.value.id === 'xxx') {
    await handleAddUser();
    return;
  }
  loading.value = true;
  success.value = null;
  try {
    const res = await updateUser(modelvalue.value);
    if (res.success) {
      success.value = 'Success updating data';
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
  success.value = null;
  try {
    let data = {
      name: modelvalue.value.name,
      email: modelvalue.value.email,
      password: modelvalue.value.password
    };
    const res = await addUser(data);
    if (res.success) {
      success.value = 'Success adding data';
    } else {
      error.value = res.errors.join(', ');
    }
  } catch (err) {
    error.value = "Something went wrong";
  }
  loading.value = false;
}
</script>
<template>
  <div class="col-md-10 p-3">
    <h5 class="mb-3">{{ modelvalue.id === 'xxx' ? 'Add User' : 'Edit User' }}</h5>
    <div v-if="error" class="my-2 w-auto alert alert-warning alert-dismissible fade show">{{ error }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="error = false"></button>
    </div>
    <div v-else-if="success" class="my-2 w-auto alert alert-success alert-dismissible fade show">{{ success }}>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="success = null"></button>
    </div>
    <form class="space-y-4" @submit.prevent="handleUpdateUser">
      <input type="hidden" v-model="modelvalue.id"></input>
      <div class="form-group mb-2">
        <label class="form-label block mb-1 text-sm font-medium text-gray-700">Name</label>
        <input
          v-model="modelvalue.name"
          type="name"
          class="form-control w-auto px-4 py-2 border border-gray-300 rounded-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your name"
          :disabled="loading"
        >
      </div>
      <div class="form-group mb-2">
        <label class="form-label block mb-1 text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="modelvalue.email"
          type="email"
          class="form-control w-auto px-4 py-2 border border-gray-300 rounded-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your email"
          :disabled="loading"
        >
      </div>
      <div class="form-group mb-2">
        <label class="form-label block mb-1 text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="modelvalue.password"
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
          {{ modelvalue.id === 'xxx' ? 'Add User' : 'Update User'  }}
        </button>
        <button
          :disabled="loading"
          type="reset"
          class="form-control w-auto btn btn-outline-danger rounded-0"
          @click="handleBack"
        >
          Back to List
        </button>
      </div>
    </form>
  </div>
</template>