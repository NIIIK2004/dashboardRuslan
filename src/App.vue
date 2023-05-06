<template>
  <div class="admin-panel">
    <header class="header bg-dark fixed-top">
      <!-- Шапка -->
      <!-- Вставьте содержимое вашей шапки здесь -->
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

export default {
  components: {
    UsersTable
  },
  data() {
    return {
      currentContent: 'users',
    }
  },
  methods: {
    changeContent(content) {
      this.currentContent = content;
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
