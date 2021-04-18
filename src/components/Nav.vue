<template>
  <nav class="menu">
    <div class="menu__logo">
      <img class="logo" alt="Sant Boi Fight Club Logo" src="../assets/logo.png">
    </div>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/attendances/new">Solicitud de Asistencias</router-link></li>
      <li><router-link to="/members">Alumnos</router-link></li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'Nav',
};
</script>
<style lang="scss">
  @import '../assets/scss/_nav.scss'
</style>
