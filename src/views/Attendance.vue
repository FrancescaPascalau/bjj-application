<template>
  <div class="attendance">
      <Nav/>
      <div class="new">
        <v-select
          :options="activities"
          v-model="selectedActivity"
          class="activities"
        />
        <div v-if="selectedActivity.sessions" >
          <date-picker
            v-model="selectedDate"
            :max-date='new Date()'
            class="activities"
          />
          <v-select
            :options="selectedActivity.sessions[selectedDate.getDay()]"
            v-if="selectedDate"
            v-model="selectedHour"
            class="activities"
          />
        </div>
        <button
          v-on:click="attendance(selectedActivity, selectedDate, selectedHour)"
          class="submit"
        >
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
import DatePicker from 'v-calendar/lib/components/date-picker.umd';

Vue.component('v-select', vSelect);
Vue.component('date-picker', DatePicker);

const activities = [
  {
    code: 'bjj',
    label: 'Brazilian Jiu Jitsu',
    sessions: {
      1: ['9 AM', '7 PM'],
      3: ['9 AM', '7 PM'],
      5: ['9 AM', '7 PM'],
      2: ['10 AM', '8 PM'],
      4: ['10 AM', '8 PM'],
    },
  },
  {
    code: 'tkw',
    label: 'Taekwando',
    sessions: {
      1: ['5 PM'],
      3: ['5 PM'],
    },
  },
  {
    code: 'kb',
    label: 'Kickboxing',
    sessions: {
      1: ['8:30 PM'],
      3: ['8:30 PM'],
    },
  },
];

export default {
  name: 'Attendance',
  data() {
    return {
      activities,
      selectedActivity: 'Seleccione la actividad',
      selectedHour: 'Seleccione la session',
      selectedDate: new Date(),
    };
  },
  components: {
    Nav,
    vSelect,
    DatePicker,
  },
  methods: {
    attendance(selectedActivity, selectedDate, selectedHour) {
      const attendance = {
        user_id: '1234',
        time: this.$firebase.firestore.Timestamp.fromDate(new Date()),
        activity: selectedActivity.code,
        session: `${selectedDate.toISOString().split('T')[0]} @ ${selectedHour}`,
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
