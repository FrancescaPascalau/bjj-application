<template>
  <div class="users">
    <Nav/>
    <form class="form" @submit="addUser(uuid, firstName, lastName)" @reset="resetForm">
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
      <h4>Añadir nuevo alumno</h4>
      <input type="text"
             class="form-control"
             placeholder="Nombre"
             v-model="firstName"
             required/>
      <input type="text"
             class="form-control"
             placeholder="Apellidos"
             v-model="lastName"
             required/>
      <button type="button"
              class="btn btn-outline-primary"
              v-on:click="resetForm()">
        Cancelar
      </button>
      <button type="button"
              class="btn btn-outline-primary"
              v-on:click="addUser(uuid, firstName, lastName)">
        Añadir
      </button>
    </form>
    <div class="usersTable">
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Apellidos</th>
        </tr>
        </thead>
        <tbody>
        <tr scope="row" v-for="user in users" :key="user.user_id">
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
        </tr>
        </tbody>
      </table>
      <button type="button" class="btn btn-outline-secondary"
              v-on:click="showAllUsers()"
              v-if="isActive">
        Mostrar alumnos
      </button>
      <button type="button" class="btn btn-outline-secondary"
              v-on:click="hideAllUsers()"
              v-if="!isActive">
        Ocultar alumnos
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue';
import { uuid } from 'vue-uuid';

export default {
  name: 'User',
  data() {
    return {
      uuid: uuid.v4(),
      firstName: '',
      lastName: '',
      errorMessage: '',
      users: [],
      isActive: true,
    };
  },
  components: {
    Nav,
  },
  methods: {
    addUser(id, firstName, lastName) {
      this.errorMessage = undefined;
      const user = {
        user_id: id,
        first_name: firstName,
        last_name: lastName,
        created_at: this.$firebase.firestore.Timestamp.fromDate(new Date()),
      };

      this.$firebase.firestore()
        .collection('users')
        .doc(`${firstName}-${lastName}`)
        .get()
        .then((snapshot) => snapshot.exists)
        .then((exists) => {
          if (!exists) {
            this.$firebase.firestore()
              .collection('users')
              .doc(`${firstName}-${lastName}`)
              .set(user)
              .catch((err) => console.error(err));
          } else {
            this.errorMessage = 'Ya existe este usuario';
          }
        });
    },
    resetForm() {
      this.firstName = '';
      this.lastName = '';
    },
    showAllUsers() {
      this.$firebase.firestore()
        .collection('users')
        .get()
        .then((snapshot) => {
          this.users = snapshot.docs.map((user) => user.data());
        });
      this.isActive = false;
    },
    hideAllUsers() {
      this.users = (user) => user.data();
      this.isActive = true;
    },
  },
};
</script>
<style lang="scss">
@import '../assets/scss/_users.scss';
</style>
