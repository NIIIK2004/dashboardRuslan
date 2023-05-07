
<template>
  <div class="admin-panel"><router-view></router-view>
<header class="header navbar navbar-expand-md navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Добро пожаловать {{user.username}}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
      aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
      </ul>
      <div class="my-2 my-md-0 header-profile">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="https://cdn-icons-png.flaticon.com/512/4837/4837857.png" alt="avatar" class="rounded-circle" style="width: 30px">
          </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
              <router-link to="/profile" class="dropdown-item">Мой профиль</router-link>
              <button class="dropdown-item" @click="logout">Выход</button>
            </div>
          </li>
        </ul>
        <span class="text-white mx-2">{{ user.email }}</span>
      </div>
    </div>
  </div>
</header>



    <div class="container-fluid admin-main">
      <div class="row">
        <nav class="col-md-2 col-lg-2 d-md-block sidebar">
          <!-- Левое меню -->
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <button class="btn btn-primary tab-btn" @click="changeContent('users')">Таблица пользователей</button>
              </li>
              <li class="nav-item">
                <button class="btn btn-primary tab-btn" @click="changeContent('orders')">Таблица хз чего пока</button>
              </li>
              <li class="nav-item">
                <button class="btn btn-primary tab-btn" @click="changeContent('settings')">Таблица тоже хз чего пока</button>
              </li>
            </ul>
          </div>
        </nav>
        <main class="col-md-10 col-lg-10 ms-sm-auto px-md-4 main">
          <!-- Основной контент -->
          <div v-if="currentContent === 'users'">
            <UsersTable/>
          </div>
          <div v-if="currentContent === 'orders'">
            <p>Заказы</p>
          </div>
          <div v-if="currentContent === 'settings'">
            <p>Настройки</p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import UsersTable from "@/components/UsersTable.vue";
import router from '@/router/router'


export default {
  components: {
    UsersTable,
  },
  data() {
    return {
      currentContent: 'users',
      user: null,
    }
  },
   mounted() {
    // Получаем ссылку на кнопку с dropdown-menu
    const dropdownBtn = document.querySelector('.dropdown-toggle');

    // Получаем ссылку на элемент с dropdown-menu
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Добавляем обработчик события на клик по кнопке
    dropdownBtn.addEventListener('click', function() {
      // Если у элемента dropdown-menu стоит display: none, то изменяем на display: block
      if (dropdownMenu.style.display === 'none') {
        dropdownMenu.style.display = 'block';
      } else { // Иначе меняем на display: none
        dropdownMenu.style.display = 'none';
      }
    });
  },

   created() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (!user) {
    router.push('/auth');
  } else {
    this.user = user;
  }
},
  methods: {
     logout() {
    sessionStorage.removeItem('user');
    this.$router.push('/auth');
  }
  }
}
</script>

<style>
.admin-panel {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.sidebar {
  padding: 0;
  margin: 0;
  position: fixed;
}
.nav {
  gap: 20px;
  padding-top: 40px;
}
.header {
  height: 200px;
  color: white;
}
.sidebar {
  height: 100%;
}
.admin-main {
  margin-top: 200px;
}
.tab-btn {
  width: 100%;
}
.header-profile{
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
}
.kek {
  width: 50px;
  height: 50px;
  margin-top: 1500px;
  border-radius: 300px;
  background-color: red;
}
.main {
  padding-top: 40px;/* ширина левого меню + отступы */
}
</style>