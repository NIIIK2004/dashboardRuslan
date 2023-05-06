<template>
  <div>
    <h1>Таблица пользователей</h1>
    <div class="button-bar" v-show="selectedUser">
      <button @click="blockUser" type="button" class="btn btn-danger button-bar-btn">Заблокировать</button>
      <button @click="editUser" type="button" class="btn btn-primary button-bar-btn">Редактировать данные</button>
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
        <tr v-for="(user, index) in users" :key="user.id"
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
export default {
  data() {
    return {
      users: [],
      selectedUser: null,
      buttonBarVisible: false
    };
  },
  created() {
    fetch("/api/user/all", {
      target: "http://localhost:8081"
    })
      .then((response) => response.json())
      .then((data) => {
        this.users = data.data;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    selectUser(user) {
      this.selectedUser = user;
      this.buttonBarVisible = true;
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
    console.log(this.selectedUser);
    if (confirm(`Вы уверены, что хотите заблокировать пользователя ${this.selectedUser}?`)) {
      // выполнить фактическую блокировку пользователя здесь
      // обновить статус пользователя в базе данных
      alert('Пользователь заблокирован!');
      this.selectedUser = null; // сбросить выбор
      this.buttonBarVisible = false; // скрыть панель кнопок
    }
  }
},
    editUser() {
      // TODO: implement edit user functionality
      alert('User edit!');
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
