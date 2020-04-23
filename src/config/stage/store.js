/*
 * @Author: your name
 * @Date: 2020-04-23 15:56:56
 * @LastEditTime: 2020-04-23 16:04:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mallVue\src\config\stage\store.js
 */
const storeRouter = {
  route: null,
  name: null,
  title: '商品管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'views/store/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '商品列表',
      type: 'view',
      name: 'storeList',
      route: '/store/list',
      filePath: 'views/store/list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '添加商品',
      type: 'view',
      name: 'storeAdd',
      route: '/store/add',
      filePath: 'views/store/add.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default storeRouter
