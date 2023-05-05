<template>
  <div class="app">

    <!-- Шапка -->
    <header class="header">
      <nav class="navbar navbar-expand-lg navbar-dark bg-red fixed-top">
        <a class="navbar-brand" href="#">Логотип</a>
        <!-- Остальное содержимое шапки -->
      </nav>
    </header>

    <div class="container-fluid">
      <div class="row">

        <!-- Левое меню -->
        <div class="col-md-2 bg-yellow left--side" style="position: fixed; height: 100vh; overflow-y: scroll;">
          <ul>
            <li><a href="#">Ссылка 1</a></li>
            <li><a href="#">Ссылка 2</a></li>
            <li><a href="#">Ссылка 3</a></li>

          </ul>
        </div>

        <!-- Основной контент -->
        <div class="col-md-10 content" style="margin-left: 16.66666667%;">


          <div class="content1" v-if="activeLink === 'Ссылка 1'">
            <h1>hi guys</h1>
            <p>Привет</p>
          </div>


          <div class="content2" v-else-if="activeLink === 'Ссылка 2'">
           <h1>т чмо</h1>
          </div>


          <div class="content3" v-else-if="activeLink === 'Ссылка 3'">
            <table class="table">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Имя</th>
                <th scope="col">Фамилия</th>
                <th scope="col">Обращение</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              </tbody>
            </table>
          </div>


        </div>


      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      activeLink: 'Ссылка 1',
    };
  },
  mounted() {
    const links = document.querySelectorAll('.bg-yellow a');
    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        this.activeLink = event.target.textContent;
      });
    });
  },
};

</script>

<style>
.header {
  height: 100px;
}
  .container-fluid {
  }
</style>


