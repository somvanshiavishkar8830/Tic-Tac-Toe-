      document.addEventListener('DOMContentLoaded', () => {
            const cells = document.querySelectorAll('.cell');
            const statusDisplay = document.querySelector('.game-status');
            const playerDisplays = document.querySelectorAll('.player');
            const restartBtn = document.getElementById('restart');
            const newGameBtn = document.getElementById('new-game');
            
            // Game state variables
            let gameActive = true;
            let currentPlayer = 'X';
            let gameState = ['', '', '', '', '', '', '', '', ''];
            
            // Winning conditions
            const winningConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]             // Diagonals
            ];
            
            // Messages
            const winningMessage = () => `Player ${currentPlayer} Wins!`;
            const drawMessage = () => `Game ended in a Draw!`;
            const currentPlayerTurn = () => `${currentPlayer}'s Turn`;
            
            // Initialize game
            statusDisplay.innerHTML = currentPlayerTurn();
            
            // Handle cell click
            function handleCellClick(clickedCellEvent) {
                const clickedCell = clickedCellEvent.target;
                const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
                
                // Check if cell is already played or game is inactive
                if (gameState[clickedCellIndex] !== '' || !gameActive) {
                    return;
                }
                
                // Process the move
                handleCellPlayed(clickedCell, clickedCellIndex);
                handleResultValidation();
            }
            
            // Update game state and UI for a played cell
            function handleCellPlayed(clickedCell, clickedCellIndex) {
                gameState[clickedCellIndex] = currentPlayer;
                clickedCell.innerHTML = currentPlayer;
                clickedCell.classList.add(currentPlayer.toLowerCase());
            }
            
            // Validate the game result
            function handleResultValidation() {
                let roundWon = false;
                
                // Check all winning conditions
                for (let i = 0; i < winningConditions.length; i++) {
                    const winCondition = winningConditions[i];
                    const a = gameState[winCondition[0]];
                    const b = gameState[winCondition[1]];
                    const c = gameState[winCondition[2]];
                    
                    // Skip empty cells
                    if (a === '' || b === '' || c === '') {
                        continue;
                    }
                    
                    // Check if three in a row
                    if (a === b && b === c) {
                        roundWon = true;
                        break;
                    }
                }
                
                // Handle win
                if (roundWon) {
                    statusDisplay.innerHTML = winningMessage();
                    gameActive = false;
                    highlightWinningCells();
                    return;
                }
                
                // Handle draw
                const roundDraw = !gameState.includes('');
                if (roundDraw) {
                    statusDisplay.innerHTML = drawMessage();
                    gameActive = false;
                    return;
                }
                
                // Continue game with next player
                handlePlayerChange();
            }
            
            // Switch players
            function handlePlayerChange() {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                statusDisplay.innerHTML = currentPlayerTurn();
                
                // Update active player indicator
                playerDisplays.forEach(player => {
                    player.classList.toggle('active');
                });
            }
            
            // Highlight winning cells
            function highlightWinningCells() {
                for (const condition of winningConditions) {
                    const [a, b, c] = condition;
                    
                    if (gameState[a] !== '' && 
                        gameState[a] === gameState[b] && 
                        gameState[a] === gameState[c]) {
                        
                        cells[a].classList.add('winner');
                        cells[b].classList.add('winner');
                        cells[c].classList.add('winner');
                        break;
                    }
                }
            }
            
            // Restart game
            function restartGame() {
                gameActive = true;
                currentPlayer = 'X';
                gameState = ['', '', '', '', '', '', '', '', ''];
                statusDisplay.innerHTML = currentPlayerTurn();
                
                // Reset cells
                cells.forEach(cell => {
                    cell.innerHTML = '';
                    cell.classList.remove('x', 'o', 'winner');
                });
                
                // Reset player indicators
                playerDisplays[0].classList.add('active');
                playerDisplays[1].classList.remove('active');
            }
            
            // Start new game (same as restart for this implementation)
            function newGame() {
                restartGame();
            }
            
            // Event listeners
            cells.forEach(cell => cell.addEventListener('click', handleCellClick));
            restartBtn.addEventListener('click', restartGame);
            newGameBtn.addEventListener('click', newGame);
        });
    