const urls = [
  'https://v-cdn.zjol.com.cn/276982.mp4',
  'https://v-cdn.zjol.com.cn/280443.mp4',
  'https://v-cdn.zjol.com.cn/276984.mp4',
  'https://v-cdn.zjol.com.cn/276985.mp4',
  'https://devapicard.itop123.com/files/file/20201118/20201118175019380251948.mp4',
  'https://devapicard.itop123.com/files/file/20201118/20201118175019380251948.mp4',
  'https://devapicard.itop123.com/files/file/20201118/20201118175019380251948.mp4',
  'https://devapicard.itop123.com/files/file/20201118/20201118175019380251948.mp4',
  'https://devapicard.itop123.com/files/file/20201118/20201118175019380251948.mp4',
  'https://devapicard.itop123.com/files/file/20201118/20201118175019380251948.mp4'
]

const videoList = urls.map((url, index) => ({ id: index + 1, url }))
Page({
  data: {
    videoList,
    current_index: 0, // 这个参数可以控制从第几个视频开始播放（可以从onLoad动态修改这个参数）
  },

  onPlay(e) {},

  onPause(e) {
    //  console.log('pause', e.detail.activeId)
  },

  onEnded(e) {},

  onError(e) {},

  onWaiting(e) {},

  onTimeUpdate(e) {},

  onProgress(e) {},

  onUpdataVideo(e) {
    let videoList = this.data.videoList;
    if (videoList.length >= 30) {
      console.log('已经加到顶了');
      return;
    }
    // 模拟数据请求
    setTimeout(()=>{
      let url = 'https://apicard.itop123.com/files/file/20210402/20210402113456425713822.mp4';
      for(let i = 0; i < 10; i++) {
        let time = new Date();
        videoList.push({id: time.getTime(), url});
      }
      this.setData({videoList});
    }, 1000)
  },

  onLoadedMetaData(e) {
    // console.log('LoadedMetaData', e)
  }
})