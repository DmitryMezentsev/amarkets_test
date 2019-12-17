<template>
  <div v-show="!success">
    <div class="spinner-wrap" v-show="loading">
      <b-spinner />
    </div>
    <div class="wizard-wrap" :class="{ visible: !loading }">
      <WizardHeader />
      <WizardForm @submit="submit" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import api from 'Base/api';
import eventBus from 'Common/js/bus';
import WizardHeader from 'Components/wizard-components/WizardHeader';
import WizardForm from 'Components/wizard-components/WizardForm';

export default {
  name: 'Wizard',
  components: { WizardHeader, WizardForm },
  computed: {
    ...mapState(['performances', 'sessions', 'data', 'success']),
    loading() {
      return this.performances === null || this.sessions === null;
    },
  },
  methods: {
    ...mapMutations(['setPending', 'setSuccess', 'clearStep', 'clearData']),
    ...mapActions(['loadPerformances', 'loadSessions']),
    submit() {
      this.setPending(true);

      api
        .post('/api/orders', {
          data: {
            type: 'orders',
            attributes: this.data,
          },
        })
        .then(() => {
          this.setSuccess(true);
          this.clearStep();
          this.clearData();
        })
        .catch(({ response: { data } }) => {
          if (data.errors_tree) eventBus.$emit('setVeeErrors', data.errors_tree.data);
        })
        .finally(() => {
          this.setPending(false);
        });
    },
  },
  created() {
    // Загрузка списка спектаклей и расписания
    this.loadPerformances();
    this.loadSessions();
  },
};
</script>

<style lang="less" scoped>
.spinner-wrap {
  margin: 15rem 0;
  text-align: center;
}

.wizard-wrap {
  position: relative;
  top: 15px;
  opacity: 0;
  transition: all ease 0.7s;

  &.visible {
    opacity: 1;
    top: 0;
  }
}
</style>
