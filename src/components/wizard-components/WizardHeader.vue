<template>
  <header>
    <h1>Заказ билета.</h1>
    <h3>Шаг {{ step }}: {{ stepTitle }}.</h3>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'WizardHeader',
  computed: {
    ...mapState(['step']),
    stepTitle() {
      const titles = ['Выбор спектакля', 'Данные для оформления', 'Оплата'];

      return titles[this.step - 1];
    },
  },
};
</script>

<style lang="less" scoped>
@import '~Common/colors';

header {
  color: @color-light;
  padding: 1rem 0;
}
</style>
