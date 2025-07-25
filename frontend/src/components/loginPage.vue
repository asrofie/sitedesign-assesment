<script lang="ts" setup>
const userAvatar = ref("https://i.pravatar.cc/50");
import { ref } from 'vue'

const form = ref({
  email: 'admin@gmail.com',
  password: 'admin123!@#$'
})

const loading = ref<boolean>(false);
const res = ref<any>(null);
const authStore = useAuthStore();

const setLoading = (value: boolean) => {
  loading.value = value;
}

const handleResponse = (res: any) => {
  console.log("response", res);
}

const handleError = (err: any) => {
  res.value = err;
}

const resetResponse = () => {
  res.value = null;
}

const handleLogin = async () => {
  loading.value = true;
  await authStore.login({email: form.value.email, password: form.value.password}, setLoading, handleResponse, handleError);
}
onMounted(() => {
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
      <h1 class="my-12 text-2xl font-bold text-center text-gray-800">LOGIN APP</h1  1>
      <div v-if="res && !res.status" class="alert alert-danger alert-dismissible fade show">{{ res.message }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="resetResponse">
          &times;
        </button>
      </div>
      <form class="space-y-4" @submit.prevent="handleLogin">
        <div class="form-group mb-2">
          <label class="form-label block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="form-control w-full px-4 py-2 border border-gray-300 rounded-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
            :disabled="loading"
          >
        </div>
        
        <div class="form-group mb-2">
          <label class="form-label block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="form.password"
            type="password"
            required
            class="form-control w-full px-4 py-2 border border-gray-300 rounded-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
            :disabled="loading"
          >
        </div>
        
        <button
          :disabled="loading"
          type="submit"
          class="form-control w-full px-4 py-2 text-black bg-blue-600 rounded-0 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Ensures perfect vertical centering */
.flex {
  display: flex;
}
.min-h-screen {
  min-height: 100vh;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
</style>