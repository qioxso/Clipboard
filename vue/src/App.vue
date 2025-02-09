<!-- src/App.vue -->
<template>
  <div class="app-container">
    <!-- 固定导航栏 -->
    <header class="app-header">
      <el-menu
          mode="horizontal"
          :router="true"
          :default-active="$route.path"
          class="nav-menu"
      >
        <div class="brand">
          <span class="logo">📋</span>
          <h1 class="title">智能剪贴板</h1>
        </div>
        <div class="menu-items">
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            首页
          </el-menu-item>
          <el-menu-item index="/about">
            <el-icon><InfoFilled /></el-icon>
            关于
          </el-menu-item>
        </div>
      </el-menu>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 页脚 -->
    <footer class="app-footer">
      <div class="footer-content">
        <p>© 2023 智能剪贴板系统 · 让效率触手可及</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { House, InfoFilled } from '@element-plus/icons-vue'
</script>

<style scoped>
/* 全局变量 */
:root {
  --primary-color: #409EFF;
  --bg-color: #f5f7fa;
  --header-height: 60px;
  --footer-height: 60px;
  --max-width: 1200px;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
}

.app-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.nav-menu {
  max-width: var(--max-width);
  margin: 0 auto;
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;

    .logo {
      font-size: 28px;
    }

    .title {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: var(--primary-color);
    }
  }

  .menu-items {
    display: flex;
    gap: 10px;
  }

  :deep(.el-menu-item) {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(var(--primary-color), 0.1);
    }

    &.is-active {
      color: var(--primary-color) !important;
      border-bottom: 2px solid var(--primary-color);
    }
  }
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: var(--max-width);
  margin: var(--header-height) auto var(--footer-height);
  padding: 30px 20px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}

.app-footer {
  background: #fff;
  text-align: center;
  padding: 20px;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 999;

  .footer-content {
    max-width: var(--max-width);
    margin: 0 auto;
    color: #666;
    font-size: 14px;
  }
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
