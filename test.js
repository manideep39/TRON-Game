class RandomPlayer extends Game {
    constructor() {
        super()
        this.countStart = 101
        this.count = 101
    }

    enemyStartPoint() {
        const pRand = this.setNameColor(`${this.count}`, "red")
        const startPoint = this.startPoint(Math.floor(Math.random() * 100))
        startPoint.appendChild(pRand)
        this.count += 1
    }

    enemyMovement(enemyId) {
        let currentPosition = this.getCurrentPosition(101)
        setInterval(() => { 
            console.log(currentPosition)

            switch (Math.floor(Math.random() * 1)) {
                case 0:
                    this.moveInX(currentPosition, enemyId)
                break;
            
            }

            currentPosition = this.getCurrentPosition(enemyId)
        }, 300) 
    }


    moveInX(currentPosition, enemyId) {
        const resX = ![9, 19, 29, 39, 49, 59, 69, 79, 89, 99].includes(Number(currentPosition))

        if ( resX ) {
            this.movePlayer(Number(currentPosition) + 1, enemyId)
        } else {
            let resYReverse = this.moveInYReverse(currentPosition, enemyId)
            if (!resYReverse) {
                this.moveInXReverse(currentPosition, enemyId)
            }
            
        }

        return resX
    }

    moveInXReverse(currentPosition, enemyId) {
        const resXReverse = ![0, 10, 20, 30, 40, 50, 60, 70, 80, 90].includes(Number(currentPosition))

        if (resXReverse) {
            this.movePlayer(Number(currentPosition) - 1, enemyId)
        }

        return resXReverse
    }

    moveInY() {
        const resY = ![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(currentPosition))

        if (resY) {
            this.movePlayer(Number(currentPosition) - 10, enemyId)
        }

        return resY
    }

    moveInYReverse(currentPosition, enemyId) {
        const resYReverse = ![90, 91, 92, 93, 94, 95, 96, 97, 98, 99].includes(Number(currentPosition))

        if ( resYReverse ) {
            this.movePlayer(Number(currentPosition) + 10, enemyId)
        }

        return resYReverse
    }

}