import Player from './modules/player.js'
import episodes from './content/episodes.js'

function start() {
  window.addEventListener('load', () => {
    const player = new Player(episodes) 

    player.start(episodes)
  })
}

start()