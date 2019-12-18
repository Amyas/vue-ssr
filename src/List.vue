<template>
  <div>
    List：{{$store.state.list.name}}
    <router-link to="/list?id=10">id=10</router-link>
  </div>
</template>

<script>
export default {
  async asyncData({ store, route }) {
    await store.dispatch("getList", route.query.id);
  }
};
</script>