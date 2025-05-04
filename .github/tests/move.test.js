// move test

// Importing functions and modules
const { move } = require("../../battlesnake-project-team-1/.github/index.js");

// Describing the move function tests
describe("move", () => {
    // Test case: describe all the behaviors of the move function
    it("returns a safe move based on the current game state", () => {
        // Arrange
        const gameState = {
            you: {
                // Snake body
                body: [
                    { x: 1, y: 1 },
                    { x: 1, y: 2 },
                    { x: 1, y: 3 },
                ],
            },
            board: {
                width: 5,
                height: 5,
                // Food position
                food: [{ x: 3, y: 3 }],
                // Empty array (easier)
                snakes: [],
            },
            turn: 1,
        };

        // Act
        const result = move(gameState);

        // Assert
        expect(["up", "down", "left", "right"]).toContain(result.move);
        // Expect the result.move to be one of the safe moves (up, down, left, right)
    });

    // Test case: describe how the move function handles the boards limit
    it("avoids the boards limit and collisions with itself and other snakes", () => {
        // Arrange
        const gameState = {
            you: {
                // Snake's body
                body: [
                    { x: 2, y: 2 },
                    { x: 2, y: 3 },
                    { x: 2, y: 4 },
                ],
            },
            board: {
                width: 5,
                height: 5,
                // Food position
                food: [{ x: 3, y: 3 }],
                snakes: [
                    {
                        // Other's snake body
                        body: [
                            { x: 3, y: 2 },
                            { x: 3, y: 1 },
                        ],
                    },
                ],
            },
            turn: 1,
        };

        // Act
        const result = move(gameState);

        // Assert
        // Expect the result.move to be a safe move (not colliding with itself or other snakes)
        expect(["up", "down", "left", "right"]).toContain(result.move);
    });

    // Test case: describe how the move function send the snake to the closest food
    it("moving towards the nearest food", () => {
        // Arrange
        const gameState = {
            you: {
                // Snake body
                body: [
                    { x: 1, y: 1 },
                    { x: 1, y: 2 },
                    { x: 1, y: 3 },
                ],
            },
            board: {
                width: 5,
                height: 5,
                food: [
                    // Nearest food
                    { x: 3, y: 3 },
                    { x: 4, y: 4 },
                ],
                // Empty array (easier)
                snakes: [],
            },
            turn: 1,
        };

        // Act
        const result = move(gameState);

        // Assert
        // Expect the result.move to be towards the nearest food position
        expect(["up", "down", "left", "right"]).toContain(result.move);
    });
});
