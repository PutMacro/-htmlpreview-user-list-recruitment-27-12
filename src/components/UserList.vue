<template>
  <div class="container content-holder">
    <header class="user-list_header">
      <div class="filter-container">
        <input v-model="inputFilter" placeholder="Search for users..." class="filter" type="text">
      </div>
      <RouterLink to="/add">
        <button class="add-user">+ Add User</button>
      </RouterLink>
    </header>
    <main class="table-content">
      <table class="table">
        <thead>
        <tr>
          <th class="col-md-1"></th>
          <th class="col-md-9 fw-bold">Full Name</th>
          <th class="col-md-2 fw-bold">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, userKey) in userPagination" :key="userKey">
          <td class="col-md-1"><img class="user-icon" :src="getImageUrl(user)" alt=""></td>
          <td class="col-md-9">{{ user.first_name }} {{ user.last_name }}</td>
          <td class="action col-md-2">
            <RouterLink to="/edit">
              <i class="glyphicon glyphicon-check"></i>
            </RouterLink>
            <i @click="deleteUser(user)" class="glyphicon glyphicon-trash margin-left"></i>
          </td>
        </tr>
        </tbody>
      </table>
    </main>
  </div>
  <pagination :value="currentPage" @input="(e) => currentPage = e" :per-page="perPage" :total-count="usersActionLength" :pagination-breaker="1"></pagination>
</template>

<script setup async>
  import { ref, watch } from 'vue';
  import { computed } from '@vue/reactivity';
  import fetchJSON from '../composables/FetchData.js';
  import { RouterLink } from 'vue-router';
  import pagination from '../composables/Pagination.vue';

  let users = ref({});

  async function loadApi() {
    const response = fetchJSON(`https://reqres.in/api/users?page=2`);
    users.value    = await response;
  }

  (async () => {
    await loadApi();
  })();

  const getImageUrl = user => {
    return new URL(user.avatar, import.meta.url).href;
  };

  const inputFilter = ref('');

  const perPage     = ref(5),
        currentPage = ref(1);

  const usersAction = computed(() => {
    return (users.value.data || []).filter(user => Object.values(user).join(' ').toLowerCase().includes(inputFilter.value.toLowerCase()));
  });

  const usersActionLength = computed(() => {
    return usersAction.value.length;
  });

  const userPagination = computed(() => {
    let pageTo   = currentPage.value * perPage.value;
    let pageFrom = pageTo - perPage.value;

    return usersAction.value.slice(pageFrom, pageTo);
  });

  function deleteUser(user) {
    fetchJSON(`https://reqres.in/api/users/2`, {
      method: 'DELETE',
      body: JSON.stringify({
        data: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar: user.avatar,
        },
      }),
    }).then(() => loadApi())
      .catch(console.error);
  }

  watch(currentPage, () => {
    loadApi();
  });
</script>

<style scoped>
  .content-holder {
    background    : #FFF;
    border-radius : .3rem;
    box-shadow    : 0px 0px 22px -11px rgba(37, 37, 37, 1);
    min-height    : 40vh;
  }

  .user-list_header {
    display         : flex;
    justify-content : space-between;
    padding         : 2rem 1rem;
  }

  .add-user {
    border        : none;
    padding       : .6rem 1rem;
    background    : #446641;
    color         : #FFF;
    border-radius : 3rem;
  }

  .filter-container {
    width : 30%;
  }

  .filter {
    border        : none;
    background    : #EEE;
    border-radius : .5rem;
    padding       : .2rem .5rem;
    width         : 100%;
  }

  .fw-bold {
    font-weight : bold;
  }

  .table > thead > tr > th,
  .table > tbody > tr > td {
    border : none;
  }

  tbody tr td {
    vertical-align : middle;
  }

  tbody tr:nth-child(odd) {
    background : #CCC;
  }

  .user-icon {
    height        : 30px;
    width         : 30px;
    border-radius : 50%;
  }

  .action {
    font-size    : 12px;
    padding-left : 1.5rem;
  }

  .glyphicon-trash {
    cursor : pointer;
  }

  .margin-left {
    margin-left : 1rem;
  }
</style>
