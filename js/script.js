// Initial HP values for both players
const INITIAL_HP = 100;
const DAMAGE_VALUE = 20;
let player1HP = INITIAL_HP;
let player2HP = INITIAL_HP;

// Create the spell ball for Player 1 or Player 2
function createSpell(player) {
    const ball = document.createElement('div');
    ball.classList.add('ball');

    // Set the initial position of the spell ball
    if (player === 1) {
        ball.classList.add('player1');
        ball.style.left = '10px'; // Player 1 starts at the left
        ball.style.top = '50%';
        
        // Animate the ball to move towards Player 2 (right)
        ball.style.animation = 'throw-ball-to-player2 2s forwards';
        ball.style.transform = 'translateX(0)';
        
        // Move the ball towards Player 2's side (right)
        setTimeout(() => {
            ball.style.transform = 'translateX(90vw)'; // Move towards Player 2
        }, 10);
    } else {
        ball.classList.add('player2');
        ball.style.right = '10px'; // Player 2 starts at the right
        ball.style.top = '50%';
        
        // Animate the ball to move towards Player 1 (left)
        ball.style.animation = 'throw-ball-to-player1 2s forwards';
        ball.style.transform = 'translateX(0)';
        
        // Move the ball towards Player 1's side (left)
        setTimeout(() => {
            ball.style.transform = 'translateX(-90vw)'; // Move towards Player 1
        }, 10);
    }

    document.body.appendChild(ball);

    // After the spell ball hits the target, apply damage
    setTimeout(() => {
        applyDamage(player);
        triggerDamageAnimation(player === 1 ? 2 : 1);  // Trigger damage animation for opponent
        document.body.removeChild(ball);
    }, 2000); // Wait for the animation to finish
}

// Apply damage to the opponent based on which player cast the spell
function applyDamage(player) {
    if (player === 1) {
        player2HP -= DAMAGE_VALUE;
        document.getElementById('player2-hp').textContent = player2HP;
    } else {
        player1HP -= DAMAGE_VALUE;
        document.getElementById('player1-hp').textContent = player1HP;
    }

    if (player1HP <= 0) {
        alert("Player 2 wins!");
        resetGame();
    } else if (player2HP <= 0) {
        alert("Player 1 wins!");
        resetGame();
    }
}

// Trigger damage animation
function triggerDamageAnimation(player) {
    const playerDiv = document.getElementById(`player${player}-character`);
    playerDiv.classList.add('damage');
    setTimeout(() => {
        playerDiv.classList.remove('damage');
    }, 300); // Animation duration
}

// Reset the game
function resetGame() {
    player1HP = INITIAL_HP;
    player2HP = INITIAL_HP;
    document.getElementById('player1-hp').textContent = player1HP;
    document.getElementById('player2-hp').textContent = player2HP;
}

// Add event listeners for the spell casting buttons
document.getElementById('createSpell1').addEventListener('click', () => createSpell(1));
document.getElementById('createSpell2').addEventListener('click', () => createSpell(2));
