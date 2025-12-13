import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  // process.cwd() 是项目根目录
  // '' 表示加载所有环境变量，不管是否有 VITE_ 前缀
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // 将 process.env.API_KEY 替换为构建时的环境变量值
      // 这里的 JSON.stringify 是必须的，因为 define 进行的是文本替换
      // 如果本地没有 .env 文件，请确保在构建命令中设置了 API_KEY (例如: API_KEY=xxx npm run build)
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY)
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    }
  }
})