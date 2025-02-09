// import axios from 'axios';
//
// const api = axios.create({
//     baseURL: 'http://localhost:8080/api' // 替换为你的后端 API 地址
// });
//
// export default {
//     // 示例：获取数据
//     getPosts() {
//         return api.get('/posts');
//     },
//     // 示例：提交数据
//     createPost(postData) {
//         return api.post('/posts', postData);
//     }
// };

//
// // server.js 新增接口
// import axios from 'axios'
//
// const api = axios.create({
//     baseURL: 'http://localhost:3000/api', // 后端服务地址
//     timeout: 5000
// })
//
// // 剪贴板相关接口
// const clipboardAPI = {
//     // 获取历史记录
//     getHistory: () => api.get('/clipboard'),
//
//     // 批量保存内容
//     saveBatch: (contents) => api.post('/clipboard/batch', { contents }),
//
//     // 保存单条内容
//     saveSingle: (content) => api.post('/clipboard', { content })
// }
//
// // 生成随机测试数据的接口
// const mockDataAPI = {
//     generateFakeData: () => {
//         const mockData = Array.from({ length: 5 }, (_, i) => ({
//             content: `随机内容 ${i + 1} - ${Math.random().toString(36).substr(2, 5)}`,
//             created_at: new Date().toISOString()
//         }))
//         return api.post('/clipboard/batch', { contents: mockData.map(d => d.content) })
//     }
// }
//
// export default {
//     ...clipboardAPI,
//     ...mockDataAPI
// }