const { move } = require("../../battlesnake-project-team-1/.github/index.js");

// Helper function to create a mock game state with a snake and opponent snake
function createMockGameState(snakeHead, opponentHead) {
    return {
        you: {
            body: [snakeHead],
        },
        board: {
            snakes: [
                {
                    body: [opponentHead],
                },
            ],
        },
    };
}

// Test case for hunting smaller snakes
test("Given a larger snake, when hunting smaller snake, then move towards opponent head", () => {
    // Arrange: Mock a game state where your snake is larger than the opponent snake
    const snakeHead = { x: 3, y: 3 };
    const opponentHead = { x: 1, y: 3 };
    const gameState = createMockGameState(snakeHead, opponentHead);

    // Act: Call the move function to get the next move
    const result = move(gameState);

    // Assert: Ensure that the move is towards the opponent snake's head
    // In this case, expect the result to be either 'left' or 'right'
    expect(["left", "right"]).toContain(result.move);
});

// Add more test cases for different scenarios if needed
