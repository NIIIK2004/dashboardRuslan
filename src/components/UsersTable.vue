<template>
  <div>
    <h1>Таблица пользователей</h1>
         <label for="filter-select">Фильтр:</label>
        <select id="filter-select" class="form-control" v-model="filter">
          <option value="all">Все</option>
          <option value="admin" selected>Администраторы</option>
          <option value="user">Пользователи</option>
          <option value="teacher">Преподаватели</option>
        </select>

  <input class="form-control mr-sm-2" type="search" placeholder="Поиск" aria-label="Поиск" v-model="query">

    <div class="button-bar" v-show="selectedUser">
      <button @click="blockUser" type="button" class="btn btn-danger button-bar-btn">Заблокировать</button>
      <button @click="editUser" type="button" class="btn btn-primary button-bar-btn">Редактировать данные</button>
      <button @click="deleteUser" type="button" class="btn btn-dark button-bar-btn">Удалить пользователя</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">id</th>
          <th scope="col">Имя</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Номер</th>
          <th scope="col">Аватар</th>
          <th scope="col">Дата</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Пароль</th>
          <th scope="col">Статус активации</th>
          <th scope="col">Роли</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filteredUsers" :key="user.id"
            :class="{ 'selected': user.id === selectedUser }"
            @click="selectUser(user.id)">

          <td>{{ index + 1 }}</td>
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td>{{ user.number }}</td>
          <td>{{ user.file }}</td>
          <td>{{ user.date }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.password }}</td>
          <td>
            <span v-if="user.active && !user.activationCode" style="color: green">Активирован</span>
            <span v-else-if="!user.active && user.activationCode" style="color: #595903">Не активирован</span>
            <span v-else-if="!user.active && !user.activationCode" style="color: red">Забанен</span>
          </td>
          <td>
          <span v-for="(role, index) in user.roles" :key="index">
            <span v-if="role === 'TEACHER'">Преподаватель</span>
            <span v-else-if="role === 'USER'">Пользователь</span>
            <span v-else-if="role === 'ADMIN'">Администратор</span>
            <span v-if="index < user.roles.length - 1">, </span>
          </span>
        </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

const instance = axios.create({
  baseURL: '',
});

export default {
data() {
  return {
    users: [],
    selectedUser: null,
    buttonBarVisible: false,
    query: '',
    filter: 'ADMIN' // set default filter value to 'ADMIN'
  };
},
 created() {
  this.filter = 'admin';
  const searchQuery = new URLSearchParams(window.location.search).get('q');
  if (searchQuery) {
    this.searchQuery = searchQuery;
  }

  fetch(`http://localhost:8080/api/user/all?q=${this.searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
      this.users = data.data;
    })
    .catch((error) => console.log(error));
},
  computed: {
  filteredUsers() {
  if (this.filter === 'all') {
    return this.users;
  } else {
    return this.users.filter(user => {
      if (this.filter === 'admin') {
        return user.roles.includes('ADMIN');
      } else {
        return user.roles.includes(this.filter.toUpperCase());
      }
    });
  }
},
},
  methods: {
    selectUser(user) {
  this.selectedUser = user;
  this.buttonBarVisible = true;
  const selectedUser = this.users.find(u => u.id === user);
  const blockBtn = document.querySelector('.button-bar-btn.btn-danger');
  if (selectedUser.active) {
    blockBtn.textContent = 'Заблокировать';
  } else {
    blockBtn.textContent = 'Разблокировать';
  }
  const selectedUser2 = Object.assign({}, selectedUser);
  console.log(selectedUser2.email); // выводим малышей в консоль для проверки
},
    unselectUser() {
      this.selectedUser = null;
      this.buttonBarVisible = false;
    },
    isUserSelected(user) {
      return this.selectedUser && user.id === this.selectedUser.id;
    },
blockUser() {
  if (this.selectedUser) {
    const selectedUser = this.users.find(u => u.id === this.selectedUser);
    const action = selectedUser.active ? 'ban' : 'unban';
    const confirmationText = selectedUser.active ? `Вы уверены, что хотите заблокировать пользователя ${this.selectedUser}?` : `Вы уверены, что хотите разблокировать пользователя ${this.selectedUser}?`;
    if (confirm(confirmationText)) {
      const data = {
        id: this.selectedUser,
      };
      instance.post(`http://localhost:8080/api/user/${action}`, data)
        .then(response => {
          alert(response.data.message);

          // Обновляем данные
          fetch("http://localhost:8080/api/user/all")
            .then((response) => response.json())
            .then((data) => {
              this.users = data.data;
            })
            .catch((error) => console.log(error));

          this.selectedUser = null;
          this.buttonBarVisible = false;
          const blockBtn = document.querySelector('.button-bar-btn.btn-danger');
          blockBtn.textContent = 'Заблокировать';
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    }
  }
},
    editUser() {
      // TODO: implement edit user functionality
      alert('User edit!');
    },
    deleteUser() {
      alert('User deleted!');
    }
  }
};
</script>


<style>
.selected {
  background-color: #252525;
  color: white;
}
tr:hover {
  background-color: #bfbebe;
  color: black;
}
.button-bar-btn {
  margin-left: 20px;
}
</style>
