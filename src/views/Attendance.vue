<template>
  <div class="attendance">
      <Nav/>
      <div class="new">
        <v-select
          :options="activities"
          v-model="selectedActivity"
          class="activities"
        />
        <button v-on:click="attendance(selectedActivity)" class="submit">
          Enviar
        </button>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue';
import Vue from 'vue';
import vSelect from 'vue-select';

Vue.component('v-select', vSelect);

const activities = [
  { code: 'bjj', label: 'Brazilian Jiu Jitsu' },
  { code: 'tkw', label: 'Taekwando' },
  { code: 'kb', label: 'Kickboxing' },
];

export default {
  name: 'Attendance',
  data() {
    return {
      activities,
      selectedActivity: 'Seleccione la actividad',
    };
  },
  components: {
    Nav,
    vSelect,
  },
  methods: {
    attendance(selectedActivity) {
      const attendance = {
        user_id: '1234',
        time: this.$firebase.firestore.Timestamp.fromDate(new Date()),
        activity: selectedActivity.code,
        confirmed: false,
      };

      this.$firebase.firestore().collection('attendance')
        .add(attendance)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    },
  },
};
</script>
<style lang="scss">
  @import '../assets/scss/_attendance.scss'
</style>
