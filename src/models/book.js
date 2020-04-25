/*
 * @Author: your name
 * @Date: 2020-04-23 15:47:06
 * @LastEditTime: 2020-04-23 17:20:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mallVue\src\models\book.js
 */
/* eslint-disable class-methods-use-this */
import { post, get, put, _delete } from '@/lin/plugins/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Book {
  // constructor() {}

  // 类中的方法可以代表一个用户行为
  async addBook(info) {
    const res = await post('cms/admin/add_comm', info, { handleError: true })
    return res
  }

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象
  async getBook(id) {
    const res = await get(`cms/admin/query_comm_details?id=${id}`)
    return res
  }

  async editBook(info) {
    const res = await put(`cms/admin/put_comm`, info)
    return res
  }

  async delectBook(id) {
    const res = await _delete(`v1/book/${id}`)
    return res
  }

  async getBooks(info) {
    const res = await get('cms/admin/query_comm', info,{ handleError: true })
    return res
  }
}

export default new Book()
