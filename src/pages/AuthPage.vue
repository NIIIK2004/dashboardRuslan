<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header"></div>
          <div class="card-body">
            <form @submit.prevent="submitForm()">
              <div class="form-group">
                <label for="username">Логин:</label>
                <input type="text" class="form-control" id="username" placeholder="Введите логин" v-model="username">
              </div>
              <div class="form-group">
                <label for="password">Пароль:</label>
                <input type="password" class="form-control" id="password" placeholder="Введите пароль" v-model="password">
              </div>
              <button type="submit" class="btn btn-primary">Войти</button>
            </form>
            <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: "AuthPage",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
   async submitForm() {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      username: this.username,
      password: this.password,
    });
    if (response.data.message === 'Не правильный логин или пароль') {
      // выводим сообщение об ошибке
      this.errorMessage = "Неправильный логин или пароль";
    } else if (response.data.message === 'Вы успешно авторизовались!') {
      // получаем всех пользователей
      const usersResponse = await axios.get('http://localhost:8080/api/user/all');
      const users = usersResponse.data.data;
      console.log(response)
      console.log(users)
      console.log(this.username)
      // находим пользователя по введенным данным
      const user = users.find(u => u.username.trim() === this.username.trim());

      if (!user) {
        // выводим сообщение об ошибке
        this.errorMessage = "Пользователь не найден";
      } else if (!user.roles.includes('ADMIN')) {
        // выводим сообщение об ошибке
        this.errorMessage = "Вход в админ панель разрешен только администраторам";
      } else {
        // После успешной авторизации
        const userlog = JSON.stringify(user)
        console.log(userlog)
        sessionStorage.setItem('user', JSON.stringify(user));
        this.$router.push('/');

      }
    } else {
      // авторизация не удалась, выводим сообщение об ошибке
      this.errorMessage = "Неправильный логин или пароль";
    }
  } catch (error) {
    console.error(error);
    this.errorMessage = "Неправильный логин или пароль";
  }
},
  },
};
</script>

<style scoped>

</style>
