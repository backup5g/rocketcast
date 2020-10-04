export default class Elements {
  constructor() {
    this.cover = document.querySelector('.card-image')
    this.title = document.querySelector('.card-content h1')
    this.artist = document.querySelector('.artist')

    this.playPause = document.querySelector('#play-button')
    this.mute = document.querySelector('#mute')
    this.seekbar = document.querySelector('#seekbar')

    this.episodesList = document.querySelector('.episodes-list')
    this.nextEpisodes = {}
  }

  tooglePlayPauseIcon() {
    this.isPlaying 
      ? this.playPause.innerHTML = '<ion-icon name="pause"></ion-icon>'
      : this.playPause.innerHTML = '<ion-icon name="play" style="transform: translateX(1.5px);"></ion-icon>'
  }

  toogleMuteIcon(muted) {
    this.mute.innerHTML = muted ? '<ion-icon name="volume-mute"></ion-icon>' : '<ion-icon name="volume-high"></ion-icon>'
  }

  loadNextEpisodes() {
    this.episodesList.innerHTML = '<h2>Próximos episódios</h2>'

    this.episodes.map((episode, index) => {
      if (index === this.currentPlaying) return

      const card = document.createElement('div')
      card.setAttribute('id', `${index}`)
      card.setAttribute('class', 'episode-card')
      card.innerHTML = `
        <div class="cover" style="
          background: url('assets/images/${episode.cover}') no-repeat center center / cover;
        "></div>

        <div class="content">
          <h3>${episode.title}</h3>

          <a href="#">
            <ion-icon name="play-forward"></ion-icon>
          </a>
        </div>
      `

      this.episodesList.appendChild(card)
    })

    this.nextEpisodes = document.querySelectorAll('.episode-card')
  }

  changeEpisode(episodeIndex) {
    this.pause()

    this.currentPlaying = Number(episodeIndex)

    this.update()
    this.loadNextEpisodes()

    this.play()
  }

  actions() {
    this.audio.onended = () => this.next()
    this.audio.ontimeupdate = () => this.timeUpdate()

    this.playPause.onclick = () => this.togglePlayPause()

    this.mute.onclick = () => this.toggleMute()

    this.seekbar.oninput = () => this.setSeek(this.seekbar.value)
    this.seekbar.onchange = () => this.setSeek(this.seekbar.value)
    this.seekbar.max = this.audio.duration

    this.nextEpisodes.forEach(episode => {
      episode.onclick = () => this.changeEpisode(episode.attributes.id.value)
    })
  }

  update() {
    const episode = this.episodes[this.currentPlaying]

    this.cover.style.background = `url('assets/images/${episode.cover}') no-repeat center center / cover`
  
    this.title.innerText = episode.title
  
    this.artist.innerHTML = `
      <ion-icon name="person"></ion-icon>
      ${episode.artist}
    `

    this.reload()
  }

  start() {
    this.update()
    this.loadNextEpisodes()
  }
}