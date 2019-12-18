<template>
  <div id="app">
    <div
      :style="`
        position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
    `"
      class="loading"
      v-if="$store.state.loading"
    >loading...</div>App
    <router-link to="/">首页</router-link>
    <router-link :to="{path:'/list'}">列表页</router-link>
    <router-view></router-view>
  </div>
</template>
