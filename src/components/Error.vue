<template>
  <div class="error" :class="{ visible: error }">{{ error }}</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Error',
  computed: {
    ...mapState(['error']),
  },
};
</script>

<style lang="less" scoped>
@import '~Common/colors';

.error {
  background-color: @color-primary;
  color: @color-light;
  position: fixed;
  top: -40px;
  left: 0;
  right: 0;
  padding: 0 0.75rem;
  height: 40px;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  transition: all 0.4s ease;
  opacity: 0;
  cursor: default;
  user-select: none;

  &.visible {
    opacity: 1;
    top: 0;
  }
}
</style>
