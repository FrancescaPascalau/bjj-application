<template>
  <div class="users">
      <Nav/>
        <form class="form">
          <p>Añadir nuevo alumno</p>
          <input type="text"
          placeholder="Nombre"
          v-model="firstName"
          class="text"
          required/>
          <input type="text"
          placeholder="Apellidos"
          v-model="lastName"
          class="text"
          required/>
          <button v-on:click="resetForm()"
            class="cancel">
            Cancelar
          </button>
          <button
            v-on:click="addUser(uuid, firstName, lastName)"
            class="submit"
          >
              Añadir
          </button>
        </form>
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
    };
  },
  components: {
    Nav,
  },
  methods: {
    addUser(id, firstName, lastName) {
      const user = {
        user_id: id,
        first_name: firstName,
        last_name: lastName,
        created_at: this.$firebase.firestore.Timestamp.fromDate(new Date()),
      };

      if (user.first_name !== '' && user.last_name !== '') {
        this.$firebase.firestore().collection('users')
          .add(user)
          .then((res) => console.log(res))
          .catch((err) => console.error(err));
      }
    },
    resetForm() {
      this.firstName = '';
      this.lastName = '';
    },
  },
};
</script>
<style lang="scss">
  @import '../assets/scss/_users.scss'
</style>
