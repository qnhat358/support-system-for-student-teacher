import { defineStore } from 'pinia'

export const useVideoCallStore = defineStore('videoCall', {
  state: () => ({
    isShowVideoCall: false,
    videoCallRoomId: '',
    callerName: '',
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