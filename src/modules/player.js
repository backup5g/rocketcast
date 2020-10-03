import Elements from './elements.js'

export default class Player extends Elements {
  constructor(episodes) {
    super()

    this.episodes = episodes
    this.audio = new Audio(`assets/audios/${episodes[0].file}`)

    this.currentPlaying = 0
    this.isPlaying = false
  }

  play() {
    this.isPlaying = true
    this.audio.play()
    this.tooglePlayPauseIcon()
  }
  
  pause() {
    this.isPlaying = false
    this.audio.pause()
    this.tooglePlayPauseIcon()
  }
  
  togglePlayPause() {
    this.isPlaying 
      ? this.pause()
      : this.play()
  }
  
  toggleMute() {
    this.audio.muted = !this.audio.muted
    this.toogleMuteIcon(this.audio.muted)
  }
  
  next() {
    this.pause()
    this.audio.currentTime = 0

    this.currentPlaying = this.currentPlaying === this.episodes.length - 1
      ? 0
      : this.currentPlaying + 1
      
    this.update()
  }
  
  setSeek(value) {
    this.audio.currentTime = value
  }
  
  timeUpdate() {
    this.seekbar.value = this.audio.currentTime
  }

  reload() {
    this.audio = new Audio(`assets/audios/${this.episodes[this.currentPlaying].file}`)

    this.audio.onloadeddata = () => {
      this.actions()
    }
  } 
}
