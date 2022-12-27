<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7 add-user">
        <div class="groups-input">
          <div class="input-container-first">
            <label for="first">First Name</label>
            <input v-model="userData.firstName" id="first" class="input-football" type="text">
          </div>
          <div class="input-container-second">
            <label for="last">Last Name</label>
            <input v-model="userData.lastName" id="last" class="second input-football" type="text">
          </div>
        </div>
        <RouterLink to="/" class="edit-user_button" @click="editUser">Update Details</RouterLink>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-4 col-md-offset-0 col-sm-6 col-sm-offset-3 avatar">
        <img src="../assets/avatar.png" alt="" id="blah">
        <input @change="onImageChange(), onFileChange()" type="file" id="upload" hidden/>
        <label for="upload">
          <i class="glyphicon glyphicon-camera"></i>
          Change Photo
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
  import fetchJSON from '../composables/FetchData';
  import { reactive } from 'vue';

  const userData = reactive({
    firstName: '',
    lastName: '',
    avatar: {},
  });

  function editUser() {
    fetchJSON(`https://reqres.in/api/users/2`, {
      method: 'PATCH',
      body: JSON.stringify({
        first_name: userData.firstName,
        last_name: userData.lastName,
        avatar: userData.avatar,
      }),
    }).catch(console.error);
  }

  function onFileChange(e) {
    let files       = e.target.files || e.dataTransfer.files;
    userData.avatar = files[0];
  }

  function onImageChange() {
    const [file] = upload.files;
    if (file) {
      blah.src = URL.createObjectURL(file);
    }
  }
</script>

<style scoped>


  .add-user {
    background      : #FFF;
    box-shadow      : 0px 0px 22px -11px rgba(37, 37, 37, 1);
    height          : 40vh;
    display         : flex;
    flex-direction  : column;
    justify-content : space-between;
  }

  .edit-user_button {
    width           : 20%;
    margin          : 0 0 2rem 2rem;
    color           : #FFF;
    background      : #446641;
    border          : none;
    border-radius   : .5rem;
    padding         : 1rem;
    text-align      : center;
    text-decoration : none;
  }

  .groups-input {
    display         : flex;
    justify-content : space-between;
  }

  .input-container-first,
  .input-container-second {
    display        : flex;
    flex-direction : column;
    padding-top    : 5rem;
  }

  .input-container-first {
    margin : 0 0 0 2rem;
    width  : 40%
  }

  .input-container-second {
    margin : 0 2rem 0;
    width  : 40%
  }

  .input-football {
    border-radius : .5rem;
    border        : 1px solid #CCC;
  }

  .avatar {
    background      : #FFF;
    box-shadow      : 0px 0px 22px -11px rgba(37, 37, 37, 1);
    height          : 40vh;
    display         : flex;
    flex-direction  : column;
    align-items     : center;
    justify-content : space-evenly;
  }

  .avatar img {
    height        : 45%;
    width         : 70%;
    border-radius : 50%;
  }

  .avatar label {
    display          : inline-block;
    background-color : transparent;
    color            : #707070;
    padding          : 0.5rem;
    font-family      : sans-serif;
    border-radius    : 0.3rem;
    cursor           : pointer;
    margin-top       : 1rem;
    border           : 1px solid #3F3F3F;
    text-align       : center;
    width            : 100%;
  }

  .avatar input {
    display : none;
  }
</style>