<script setup lang="ts">
import {isSmallScreen} from "@src/utils/helpers";

const nuxtApp = useNuxtApp();
const isSidebarOpen = ref(!isSmallScreen());
const sideBarMargin = ref(0);
const isAuthenticated = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  sideBarMargin.value = isSidebarOpen.value ? 280 : 0;
};

onMounted(async () => {
  sideBarMargin.value = 280;
  
});

</script>

<template>
  <div v-if="isAuthenticated">
    <main class="main-content">
      <NuxtPage />
    </main>
  </div>

  <div v-else>
    <NuxtPage />
  </div>
</template>

<style lang="scss" scoped>

</style>
