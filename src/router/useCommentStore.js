//Pinia store — tức là một nơi trung tâm để lưu trữ và quản lý dữ liệu bình luận

import { defineStore } from 'pinia'

export const useCommentStore = defineStore('commentStore', {
  state: () => ({
    commentsByPost: {}
  }),
  actions: {
    getStorageKey(title) {
      return `comments_${title}`
    },
    loadComments(title) {
      const saved = localStorage.getItem(this.getStorageKey(title))
      this.commentsByPost[title] = saved ? JSON.parse(saved) : []
    },
    addComment(title, comment) {
      if (!this.commentsByPost[title]) {
        this.commentsByPost[title] = []
      }
      this.commentsByPost[title].unshift(comment)
      localStorage.setItem(
        this.getStorageKey(title),
        JSON.stringify(this.commentsByPost[title])
      )
    },
    getComments(title) {
      return this.commentsByPost[title] || []
    },
    loadAllComments(titles) {
      titles.forEach((title) => this.loadComments(title))
    }
  }
})


