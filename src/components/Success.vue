<template>
  <div class="success" v-show="success">Билет заказан.</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Success',
  computed: {
    ...mapState(['success']),
  },
};
</script>

<style lang="less" scoped>
@import '~Common/colors';

.success {
  text-align: center;
  font-size: 2.5rem;
  color: @color-light;
  position: fixed;
  top: 35%;
  left: 0;
  right: 0;
}
</style>
