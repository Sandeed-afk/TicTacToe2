export default class GameView {
    constructor(root) {
        this.x = 0;
        this.y = 0;
        this.score = 0;
        this.root = root;
        this.root.innerHTML = `
            <div class="header">
                <div class="header__turn"></div>
                <div class="header__status"></div>
                <button type="button" class="header__restart">
                    <i class="material-icons">refresh</i>
                    </button>
                <button type="button" class="header__single">
                    Single&nbsp;Player
                    </button>
                <button type="button" class="header__multi">
                    Multiplayer
                    </button>
                <div class="header__Xwins">X:</div>
                <div class="header__Owins">O:</div>
            </div>
            <div class="board">
                <div class="board__tile" data-index="0"></div>
                <div class="board__tile" data-index="1"></div>
                <div class="board__tile" data-index="2"></div>
                <div class="board__tile" data-index="3"></div>
                <div class="board__tile" data-index="4"></div>
                <div class="board__tile" data-index="5"></div>
                <div class="board__tile" data-index="6"></div>
                <div class="board__tile" data-index="7"></div>
                <div class="board__tile" data-index="8"></div>
            </div>
        `;

        this.onTileClick = undefined;
        this.onRestartClick = undefined;

        this.root.querySelectorAll(".board__tile").forEach(tile => {
            tile.addEventListener("click", () => {
                if (this.onTileClick) {
                    this.onTileClick(tile.dataset.index);
                }
            });
        });

        this.root.querySelector(".header__restart").addEventListener("click", () => {
            if (this.onRestartClick) {
                this.onRestartClick();
                this.score = 0;
            }
        });

        this.root.querySelector(".header__multi").addEventListener("click", () => {
            if (this.onRestartClick) {
                this.x = 0;
                this.y = 0;
                this.root.querySelector(".header__Xwins").textContent = `X:`;
                this.root.querySelector(".header__Owins").textContent = `O:`;

                this.onRestartClick();
                this.score = 0;
            }
        });


    }

    update(game) {
        this.updateTurn(game);
        this.updateStatus(game);
        this.updateBoard(game);

    }

    updateTurn(game) {
        this.root.querySelector(".header__turn").textContent = `${game.turn}'s turn`;
    }
    
   
    updateStatus(game) {
        
        let status = "In Progress";
         
        

        if (game.findWinningCombination() && this.score === 0) {
            status = `${game.turn} is the Winner!`;
            if (game.turn === "X") {
                this.score = this.score + 1;
                this.x = this.x + 1;
                this.root.querySelector(".header__Xwins").textContent = `X:${this.x}`;
            } else {
                this.score = this.score + 1;
                this.y = this.y + 1;
                this.root.querySelector(".header__Owins").textContent = `O:${this.y}`;
            }
        } else if (!game.isInProgress() && this.score === 0) {
            status = "It's a tie!";
        }

        this.root.querySelector(".header__status").textContent = status;
    }

    updateBoard(game) {
        const winningCombination = game.findWinningCombination();

        for (let i = 0; i < game.board.length; i++) {
            const tile = this.root.querySelector(`.board__tile[data-index="${i}"]`);

            tile.classList.remove("board__tile--winner");
            tile.textContent = game.board[i];

            if (winningCombination && winningCombination.includes(i)) {
                tile.classList.add("board__tile--winner");
            }
        }
    }
}