const bookRouter = {
  route: null,
  name: null,
  title: '用户管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'views/user/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '粉丝列表',
      type: 'view',
      name: 'bookAdd',
      route: '/book/add',
      filePath: 'views/user/BookAdd.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '用户列表',
      type: 'view',
      name: 'bookAdd',
      route: '/book/list',
      filePath: 'views/user/BookList.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default bookRouter
