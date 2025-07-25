<script lang="ts" setup>
const userAvatar = ref("https://i.pravatar.cc/50");
import { ref } from 'vue'
const authStore = useAuthStore();

onMounted(() => {
  const isAuthenticated = authStore.checkLogin();
  if (isAuthenticated) {
    navigateTo("/admin")
    return true;
  }  
});
</script>

<template>
  <login-page></login-page>
</template>

<style lang="scss" scoped>

</style>
