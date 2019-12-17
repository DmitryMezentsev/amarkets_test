<template>
  <b-container class="wrap" fluid>
    <Error />
    <Wizard />
    <Success />
  </b-container>
</template>

<script>
import Error from 'Components/Error';
import Wizard from 'Components/Wizard';
import Success from 'Components/Success';

export default {
  name: 'App',
  components: { Error, Wizard, Success },
};
</script>

<style lang="less" scoped>
.wrap {
  margin: 0 auto;
  max-width: 1000px;
  min-width: 420px;
  padding: 0 12px;
}
</style>
