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
  console.log('Login attempt with:', form.value)
  // Add your authentication logic here
  loading.value = true;
  await authStore.login({email: form.value.email, password: form.value.password}, setLoading, handleResponse, handleError);
  // if (authStore.isAuthenticated) {
  //   navigateTo("/admin")
  //   return true;
  // } else {
    
  // };
}
onMounted(() => {
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
      <h1 class="mb-6 text-2xl font-bold text-center text-gray-800">LOGIN APP</h1  1>
      <div v-if="res && !res.status" class="alert-warning alert-dismissible fade show">{{ res.message }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="resetResponse">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
            :disabled="loading"
          >
        </div>
        
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="form.password"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
            :disabled="loading"
          >
        </div>
        
        <button
          :disabled="loading"
          type="submit"
          class="w-full px-4 py-2 text-black bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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