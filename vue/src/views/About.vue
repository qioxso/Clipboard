<!--<template>-->
<!--  <div>-->
<!--    <button @click="loadData" :disabled="isLoading">-->
<!--      {{ isLoading ? '加载中...' : '加载数据' }}-->
<!--    </button>-->
<!--  </div>-->
<!--  First name: <input type="text" name="FirstName" value="Mickey"><br>-->
<!--  Last name: <input type="text" name="LastName" value="Mouse"><br>-->
<!--  <input type="submit" value="提交">-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref } from 'vue';-->
<!--import api from "@/services/api.js";-->

<!--const data = ref([]);-->

<!--const loadData = async () => {-->
<!--  isLoading.value = true;-->
<!--  try {-->
<!--    const response = await api.getPosts();-->
<!--  } finally {-->
<!--    isLoading.value = false;-->
<!--  }-->
<!--};-->
<!--</script>-->

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h2>关于我们</h2>
      </div>
    </template>
    <el-timeline>
      <el-timeline-item timestamp="2024/1/1" placement="top">
        <el-card>
          <h4>项目启动</h4>
          <p>正式立项开发</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2024/3/1" placement="top">
        <el-card>
          <h4>版本发布</h4>
          <p>第一个正式版本上线</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<style scoped>
.box-card {
  margin-top: 20px;
}
.card-header {
  text-align: center;
}
</style>