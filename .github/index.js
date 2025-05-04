// Welcome to
// __________         __    __  .__                               __
// \______   \_____ _/  |__/  |_|  |   ____   ______ ____ _____  |  | __ ____
//  |    |  _/\__  \\   __\   __\  | _/ __ \ /  ___//    \\__  \ |  |/ // __ \
//  |    |   \ / __ \|  |  |  | |  |_\  ___/ \___ \|   |  \/ __ \|    <\  ___/
//  |________/(______/__|  |__| |____/\_____>______>___|__(______/__|__\\_____>
//
// This file can be a nice home for your Battlesnake logic and helper functions.
//
// To get you started we've included code to prevent your Battlesnake from moving backwards.
// For more info see docs.battlesnake.com

import runServer from "./server.js";

// Calculates the Manhattan distance between two points.
function manhattanDistance(pointA, pointB) {
    return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y);
}

// Recursive flood-fill algorithm to check if a path exists from 'current' to 'target'.
function floodFill(current, target, visited, gameState) {
    const x = current.x;
    const y = current.y;
    // Base cases: out of bounds or already visited
    if (
        x < 0 ||
        y < 0 ||
        x >= gameState.board.width ||
        y >= gameState.board.height ||
        visited[y][x]
    ) {
        return false;
    }

    visited[y][x] = true;
    // Base case: target reached

    if (x === target.x && y === target.y) {
        return true;
    }

    // Recursive cases: check neighbors

    return (
        floodFill({ x: x, y: y - 1 }, target, visited, gameState) || // Up
        floodFill({ x: x, y: y + 1 }, target, visited, gameState) || // Down
        floodFill({ x: x - 1, y: y }, target, visited, gameState) || // Left
        floodFill({ x: x + 1, y: y }, target, visited, gameState)
    ); // Right
}

// info is called when you create your Battlesnake on play.battlesnake.com
// and controls your Battlesnake's appearance
// TIP: If you open your Battlesnake URL in a browser you should see this data
function info() {
    console.log("INFO");
    return {
        apiversion: "1",
        author: "pgvle", // TODO: Your Battlesnake Username
        color: "#182CEA", // TODO: Choose color
        head: "all-seeing", // TODO: Choose head
        tail: "ice-skate", // TODO: Choose tail
    };
}
// start is called when your Battlesnake begins a game.
function start(gameState) {
    console.log("GAME START");
}
// end is called when your Battlesnake finishes a game
function end(gameState) {
    console.log("GAME OVER\n");
}

// Checks if the snake will eat food in the next turn based on its head position.
function willEatNextTurn(snake, gameState) {
    const head = snake.body[0];
    return gameState.board.food.some(
        (food) => food.x === head.x && food.y === head.y,
    );
}
// move is called on every turn and returns your next move
// Valid moves are "up", "down", "left", or "right"
// See https://docs.battlesnake.com/api/example-move for available data
function move(gameState) {
    let isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true,
    };
    // We've included code to prevent your Battlesnake from moving backwards
    const myHead = gameState.you.body[0];
    const myNeck = gameState.you.body[1];

    if (myNeck.x < myHead.x) {
        // Neck is left of head, don't move left
        isMoveSafe.left = false;
    } else if (myNeck.x > myHead.x) {
        // Neck is right of head, don't move right
        isMoveSafe.right = false;
    } else if (myNeck.y < myHead.y) {
        // Neck is below head, don't move down
        isMoveSafe.down = false;
    } else if (myNeck.y > myHead.y) {
        // Neck is above head, don't move up
        isMoveSafe.up = false;
    }

    // TODO: Step 1 - Prevent your Battlesnake from moving out of bounds
    const boardWidth = gameState.board.width; //already existed
    const boardHeight = gameState.board.height; //already existed

    if (myHead.x === 0) {
        isMoveSafe.left = false; // it prevents to go left
    }
    if (myHead.x === boardWidth - 1) {
        isMoveSafe.right = false; // it prevents to go right
    }
    if (myHead.y === 0) {
        isMoveSafe.down = false; // it prevents to go down
    }
    if (myHead.y === boardHeight - 1) {
        // because height is equal to position 10 + 0 =11
        isMoveSafe.up = false; // it prevents to go up
    }

    // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
    // collision checks between the head of the Battlesnake (myHead) and its own body segments (segment). If a collision happens in a direction, the move is unsafe and isMoveSafe becomes false.
    const myBody = gameState.you.body;
    // myBody variable is mySnake.length

    for (let i = 0; i < myBody.length; i++) {
        const segment = myBody[i];
        if (myHead.x === segment.x && myHead.y + 1 === segment.y) {
            isMoveSafe.up = false;
        }
        if (myHead.x === segment.x && myHead.y - 1 === segment.y) {
            isMoveSafe.down = false;
        }
        if (myHead.x - 1 === segment.x && myHead.y === segment.y) {
            isMoveSafe.left = false;
        }
        if (myHead.x + 1 === segment.x && myHead.y === segment.y) {
            isMoveSafe.right = false;
        }
    }

    // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
    const opponents = gameState.board.snakes;

    // Checks step by step over each opponent snake
    // Checks step by step over each segment of the opponent snake's body
    for (let i = 0; i < opponents.length; i++) {
        const opponent = opponents[i];
        // Checks step by step over each segment of the opponent snake's body
        for (let j = 0; j < opponent.body.length; j++) {
            const segment = opponent.body[j];
            // If this is the tail and the opponent won't eat next turn

            // Check for any collisions with opponent snake body segments
            // and update isMoveSafe
            if (
                j === opponent.body.length - 1 &&
                !willEatNextTurn(opponent, gameState)
            ) {
                continue;
            }

            if (myHead.x === segment.x && myHead.y + 1 === segment.y)
                isMoveSafe.up = false;
            if (myHead.x === segment.x && myHead.y - 1 === segment.y)
                isMoveSafe.down = false;
            if (myHead.x - 1 === segment.x && myHead.y === segment.y)
                isMoveSafe.left = false;
            if (myHead.x + 1 === segment.x && myHead.y === segment.y)
                isMoveSafe.right = false;
        }
    }
    // Are there any safe moves left?
    const safeMoves = Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);
    if (safeMoves.length == 0) {
        // Choose the move with the lowest score from the sorted array
        console.log(
            `MOVE ${gameState.turn}: No safe moves detected! Moving down`,
        );
        return { move: "down" };
    }
    // Choose a random move from the safe moves
    const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

    // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer and Manhantan Distance implemented

    // Initialize a 2D array in order to keep in history all the  visited cells for flood-fill algorithm
    const visited = new Array(gameState.board.height)
        .fill(false)
        .map(() => new Array(gameState.board.width).fill(false));

    // Get information about available food on the board
    const food = gameState.board.food;
    const foodDistance = food.map((food) => manhattanDistance(myHead, food));
    const minDistance = Math.min(...foodDistance);
    const closestFood = food[foodDistance.indexOf(minDistance)];

    // Use flood-fill to check if there is a safe path to the closest food
    if (floodFill(myHead, closestFood, visited, gameState)) {
        // Calculate the distances in the x and y directions on our battlesnake board
        const xDistance = myHead.x - closestFood.x;
        const yDistance = myHead.y - closestFood.y;

        // Move in the direction of the closest food
        if (xDistance < 0 && isMoveSafe.right) {
            return { move: "right" };
        }
        if (xDistance > 0 && isMoveSafe.left) {
            return { move: "left" };
        }
        if (yDistance < 0 && isMoveSafe.up) {
            return { move: "up" };
        }
        if (yDistance > 0 && isMoveSafe.down) {
            return { move: "down" };
        }
    }

    // TODO: Step 5 - Hunt smaller snakes if your snake is larger
    const myLength = gameState.you.body.length;
    for (let i = 0; i < opponents.length; i++) {
        const opponent = opponents[i];
        if (myLength <= opponent.body.length) {
            continue; // ignores the opponent if it's not smaller
        }

        // if opponent is smaller it moves to the postion of the small snakes head
        const opponentHead = opponent.body[0];
        const xDistance = myHead.x - opponentHead.x;
        const yDistance = myHead.y - opponentHead.y;

        // Moves in the direction of the smaller snake
        if (xDistance < 0 && isMoveSafe.right) {
            return { move: "right" };
        }
        if (xDistance > 0 && isMoveSafe.left) {
            return { move: "left" };
        }
        if (yDistance < 0 && isMoveSafe.up) {
            return { move: "up" };
        }
        if (yDistance > 0 && isMoveSafe.down) {
            return { move: "down" };
        }
    }
    // If the flood-fill ialgorithm fionds no safe path to food, it makes the snake move randomly (safe moves).
    return { move: nextMove };
}

// Run the server with the specified callbacks

runServer({
    info: info,
    start: start,
    move: move,
    end: end,
});
