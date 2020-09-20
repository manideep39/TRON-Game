window.onload = () => {

    const grid = new Grid(100)
    grid.makeGrid()
    const game1 = new Game()
    const game2 = new Game()
    game1.startGame(player1.name, player1.color)
    game2.startGame(player2.name, player2.color)
    const track = new Track([], [])
    game1.controls(player2.name, "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", track.trackOne, player2.color)
    game2.controls(player1.name, "w", "d", "s", "a", track.trackTwo, player1.color)
}

class Player {
    constructor(name, color) {
        this.name = name
        this.color = color
    }
}


const player1 = new Player("Manideep", "#3098E0")
const player2 = new Player("Aayushi", "#E05230")

class Game {
    constructor() {
        this.timer = null

    }

    startPoint(nthChild) {
        const startPoint = document.querySelector(`#grid > div:nth-child(${nthChild})`)
        return startPoint
    }

    startGame(playerName, playerColor) {
        const p1StartPoint = this.startPoint(Math.floor(Math.random() * 10000))
        // const p2StartPoint = this.startPoint(Math.floor(Math.random() * 10000))
        const p1 = this.setNameColor(playerName, playerColor)
        // const p2 = this.setNameColor(player2.name, player2.color)
        p1StartPoint.append(p1)
        // p2StartPoint.append(p2)
    }

    setNameColor(playerName, playerColor) {
        const player = document.createElement('div');
        player.innerHTML = `<i class="fas fa-biking" style="background-color:white;"></i>`
        player.setAttribute('id', playerName);
        player.style.backgroundColor = playerColor
        return player;
    }

    // move player to that perticular cell(div-Id), given as argument 'n'
    movePlayer(n, playerId) {
        const player = document.getElementById(`${playerId}`)
        let div = document.getElementById(`${n}`)
        div.appendChild(player)
    }

    getCurrentPosition(playerId) {
        const player = document.getElementById(`${playerId}`)
        return player.parentNode.id
    }

    leaveMark(track, color, playerName) {
        const cell = document.getElementById(`${track[track.length - 1]}`)
        cell.innerHTML = `<div class="${playerName}" style="background-color: ${color}"></div>`
    }

    gameOver(playerId) {
        const player = document.getElementById(`${playerId}`)
        console.log(player.parentNode.childNodes)
        if (player.parentNode.childNodes.length == 2) {

            if (player.parentNode.childNodes[0].attributes[0].value == playerId) {
                console.log(playerId, `Self Crash`)
                clearInterval(this.timer)
            } else if (player.parentNode.childNodes[0].attributes[0].value !== playerId) {
                console.log(playerId, `Crashed into ${player.parentNode.childNodes[0].attributes[0].value}`)
                clearInterval(this.timer)
            }
            
        }
    }

    controls(playerName, up, right, down, left, track, color) {
        document.body.addEventListener("keydown", (event) => {

            if (event.key == down) {

                if (this.getCurrentPosition(playerName) < 9800) {
                    clearInterval(this.timer)
                    this.timer = setInterval(() => {
                        let i = this.getCurrentPosition(playerName)
                        track.push(i)
                        this.movePlayer( Number(i) + 100, playerName)
                        this.leaveMark(track, color, playerName)
                        this.gameOver(playerName)
                    }, 100)
                }

            } else if (event.key == up) {

                if (this.getCurrentPosition(playerName) >= 100) {
                    clearInterval(this.timer)
                    this.timer = setInterval(() => {
                        let i = this.getCurrentPosition(playerName)
                        track.push(i)
                        this.movePlayer( Number(i) - 100, playerName)
                        this.leaveMark(track, color, playerName)
                        this.gameOver(playerName)
                    }, 100)
                }

            } else if (event.key == right) {

                if (this.getCurrentPosition(playerName) < 9999) {
                    clearInterval(this.timer)
                    this.timer = setInterval(() => {
                        let i = this.getCurrentPosition(playerName)
                        track.push(i)
                        this.movePlayer( Number(i) + 1, playerName)
                        this.leaveMark(track, color, playerName)
                        this.gameOver(playerName)
                    }, 100)
                }

            } else if (event.key == left) {

                if (this.getCurrentPosition(playerName) > 0) {
                    clearInterval(this.timer)
                    this.timer = setInterval(() => {
                        let i = this.getCurrentPosition(playerName)
                        track.push(i)
                        this.movePlayer( Number(i) - 1, playerName)
                        this.leaveMark(track, color, playerName)
                        this.gameOver(playerName)
                    }, 100)
                }

            }

        })
    }

}


class Grid {
    constructor(size) {
        this.size = size;
    }

    makeGrid() {
        const grid = document.querySelector('#grid')
        for (let i = 0; i < this.size * this.size; i++) {
            const cell = document.createElement('div');
            cell.id = i
            // cell.innerHTML = i
            grid.appendChild(cell);
        }
    }
        
}

class Track {
    constructor(trackOne, trackTwo) {
        this.trackOne = trackOne;
        this.trackTwo = trackTwo;
    }

}



