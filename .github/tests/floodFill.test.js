// floodFill Test

// Import the floodFill function from the snake file
const {
    floodFill,
} = require("../../battlesnake-project-team-1/.github/index.js");

// Describing block for the floodFill function tests
describe("floodFill", () => {
    // Test case: target is close to current position
    it("returns true if the target is close to current position", () => {
        // Arrange
        const gameState = { board: { width: 5, height: 5 } };
        const start = { x: 1, y: 1 };
        const target = { x: 4, y: 4 };
        const visited = Array(5)
            .fill()
            .map(() => Array(5).fill(false));

        // Act
        const result = floodFill(start, target, visited, gameState);

        // Assert
        expect(result).toBe(true);
        // Expect the result to be true since the target is reachable
    });

    // Test case: target is not close to the current position
    it("returns false if the target is not close to the current position", () => {
        // Arrange
        const gameState = { board: { width: 5, height: 5 } };
        const start = { x: 1, y: 1 };
        const target = { x: 3, y: 3 };
        const visited = Array(5)
            .fill()
            .map(() => Array(5).fill(false));

        // Act
        const result = floodFill(start, target, visited, gameState);

        // Assert
        expect(result).toBe(false);
        // Expect the result to be false if the target is not close
    });

    // Test case: out-of-bounds
    it("out-of-bounds", () => {
        // Arrange
        const gameState = { board: { width: 5, height: 5 } };
        const start = { x: 0, y: 0 };
        const target = { x: -1, y: -1 }; // Out of bounds
        const visited = Array(5)
            .fill()
            .map(() => Array(5).fill(false));

        // Act
        const result = floodFill(start, target, visited, gameState);

        // Assert
        expect(result).toBe(false);
        // Expect the result to be false since the target is out of bounds
    });

    // Test case: marking visited positions
    it("marking visited positions", () => {
        // Arrange
        const gameState = { board: { width: 5, height: 5 } };
        const start = { x: 1, y: 1 };
        const target = { x: 3, y: 3 };
        const visited = Array(5)
            .fill()
            .map(() => Array(5).fill(false));

        // Act
        floodFill(start, target, visited, gameState);

        // Assert
        // Expect specific positions to be marked as visited during the flood fill
        expect(visited[1][1]).toBe(true);
        expect(visited[2][1]).toBe(true);
        expect(visited[3][1]).toBe(true);
        expect(visited[3][2]).toBe(true);
        expect(visited[3][3]).toBe(true);
    });
});
