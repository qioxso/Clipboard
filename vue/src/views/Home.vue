<template>
  <div class="home-container">
    <div class="input-section">
      <el-input
          v-model="inputContent"
          placeholder="请输入内容"
          clearable
          @keyup.enter="saveContent"
      />
      <el-button
          type="primary"
          :loading="saving"
          @click="saveContent"
      >
        保存到剪贴板历史
      </el-button>
    </div>

    <el-divider />

    <el-table
        :data="clipboardHistory"
        v-loading="loading"
        height="500px"
        style="width: 100%"
    >
      <el-table-column prop="content" label="内容" min-width="200" />
      <el-table-column prop="timestamp" label="保存时间" width="180" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button
              size="small"
              @click="copyToClipboard(row.content)"
          >
            复制
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

// 响应式数据
const inputContent = ref('')
const clipboardHistory = ref([])
const loading = ref(false)
const saving = ref(false)

// 获取剪贴板历史
const fetchClipboardHistory = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/clipboard/history')
    clipboardHistory.value = response.data.map(item => ({
      ...item,
      timestamp: new Date(item.timestamp).toLocaleString()
    }))
  } catch (error) {
    ElMessage.error('获取历史记录失败')
    console.error('Error fetching history:', error)
  } finally {
    loading.value = false
  }
}

// 保存内容
const saveContent = async () => {
  if (!inputContent.value.trim()) {
    ElMessage.warning('请输入有效内容')
    return
  }

  try {
    saving.value = true
    await axios.post('/api/clipboard/save', {
      content: inputContent.value.trim()
    })
    ElMessage.success('保存成功')
    inputContent.value = ''
    await fetchClipboardHistory()
  } catch (error) {
    ElMessage.error('保存失败')
    console.error('Error saving content:', error)
  } finally {
    saving.value = false
  }
}

// 复制到系统剪贴板
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
      .then(() => ElMessage.success('已复制到剪贴板'))
      .catch(() => ElMessage.error('复制失败'))
}

// 初始化时加载数据
onMounted(() => {
  fetchClipboardHistory()
})
</script>

<style scoped>
.home-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.el-input {
  flex: 1;
}

.el-table {
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
