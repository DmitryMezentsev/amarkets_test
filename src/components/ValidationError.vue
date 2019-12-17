<template>
  <span class="validation-error" v-if="errors && errors.length">{{ errors[0] }}</span>
</template>

<script>
export default {
  name: 'ValidationError',
  props: {
    errors: { type: Array },
  },
};
</script>

<style lang="less" scoped>
@import '~Common/colors';

.validation-error {
  color: @color-primary;
  font-size: 0.8rem;
  user-select: none;
  cursor: default;
  margin-left: 3px;
}
</style>
