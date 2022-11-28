import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {
    createStyleImportPlugin,
    ElementPlusResolve,
} from 'vite-plugin-style-import';
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        createStyleImportPlugin({
            resolves: [ElementPlusResolve()],
            libs: [
                // 如果没有你需要的resolve，可以在lib内直接写，也可以给我们提供PR
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    resolveStyle: (name): string => {
                        return `element-plus/lib/theme-chalk/${name}.css`;
                    },
                    ensureStyleFile: true, // 忽略文件是否存在, 导入不存在的CSS文件时防止错误。
                },
            ],
        }),
    ],
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        port: 8080, //启动端口
        hmr: {
            host: '127.0.0.1',
            port: 8080,
        },
    },
});
