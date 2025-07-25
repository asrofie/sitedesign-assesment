<script lang="ts" setup>
  const authStore = useAuthStore();
  const handleLogout = async () => {
    await authStore.logout();
  }
</script>
<template>
  <div class="container-fluid">
    <!-- Topbar -->
    <div class="row border-bottom border-black">
      <div class="col d-flex justify-content-between align-items-center p-2">
        <span class="fw-bold">LOGO APP</span>
        <button @click="handleLogout" class="btn btn-outline-danger" type="button"><i class="fa-solid fa-bars"></i> <span>Logout</span></button>
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
      <div class="col-md-10 p-3">
        <h5 class="mb-3">User List</h5>
        
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
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>John@email.com</td>
              <td>Active</td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-1">update</button>
                <button class="btn btn-sm btn-outline-danger">delete</button>
              </td>
            </tr>
            <!-- Additional rows would go here -->
          </tbody>
        </table>
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