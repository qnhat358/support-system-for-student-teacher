import { defineStore } from 'pinia'

export const useVideoCallStore = defineStore('videoCall', {
  state: () => ({
    isShowVideoCall: false,
    videoCallRoomId: '',
    callerName: '',
    avatar: '',
  }),
  getters: {
  },
  actions: {
    toggleShowVideoCall(){
      this.callerName = ''
      this.isShowVideoCall = !this.isShowVideoCall;
    }
  },
})