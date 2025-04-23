import type { GridNode } from "../types"

// Random Maze Generator
export const generateRandomMaze = (
  grid: GridNode[][],
  startNodePos: { row: number; col: number },
  finishNodePos: { row: number; col: number },
  bombNodePos: { row: number; col: number } | null,
): GridNode[][] => {
  const newGrid = JSON.parse(JSON.stringify(grid)) as GridNode[][]

  for (let row = 0; row < newGrid.length; row++) {
    for (let col = 0; col < newGrid[0].length; col++) {
      // Skip start, finish, and bomb nodes
      if (
        (row === startNodePos.row && col === startNodePos.col) ||
        (row === finishNodePos.row && col === finishNodePos.col) ||
        (bombNodePos && row === bombNodePos.row && col === bombNodePos.col)
      ) {
        continue
      }

      // 30% chance of creating a wall
      if (Math.random() < 0.3) {
        newGrid[row][col].isWall = true
      }
    }
  }

  return newGrid
}

// Recursive Division Maze Generator
export const generateRecursiveDivisionMaze = (
  grid: GridNode[][],
  startNodePos: { row: number; col: number },
  finishNodePos: { row: number; col: number },
  bombNodePos: { row: number; col: number } | null,
): GridNode[][] => {
  const newGrid = JSON.parse(JSON.stringify(grid)) as GridNode[][]
  const height = newGrid.length
  const width = newGrid[0].length

  // Add outer walls
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (row === 0 || row === height - 1 || col === 0 || col === width - 1) {
        // Skip start, finish, and bomb nodes
        if (
          (row === startNodePos.row && col === startNodePos.col) ||
          (row === finishNodePos.row && col === finishNodePos.col) ||
          (bombNodePos && row === bombNodePos.row && col === bombNodePos.col)
        ) {
          continue
        }

        newGrid[row][col].isWall = true
      }
    }
  }

  // Recursively divide the maze
  recursiveDivision(
    newGrid,
    1,
    height - 2,
    1,
    width - 2,
    chooseOrientation(height - 2, width - 2),
    startNodePos,
    finishNodePos,
    bombNodePos,
  )

  return newGrid
}

// Vertical Maze Generator
export const generateVerticalMaze = (
  grid: GridNode[][],
  startNodePos: { row: number; col: number },
  finishNodePos: { row: number; col: number },
  bombNodePos: { row: number; col: number } | null,
): GridNode[][] => {
  const newGrid = JSON.parse(JSON.stringify(grid)) as GridNode[][]
  const width = newGrid[0].length

  for (let col = 0; col < width; col += 2) {
    for (let row = 0; row < newGrid.length; row++) {
      // Skip start, finish, and bomb nodes
      if (
        (row === startNodePos.row && col === startNodePos.col) ||
        (row === finishNodePos.row && col === finishNodePos.col) ||
        (bombNodePos && row === bombNodePos.row && col === bombNodePos.col)
      ) {
        continue
      }

      // Create vertical walls
      if (col < width - 1) {
        newGrid[row][col].isWall = true
      }

      // Add random passages
      if (Math.random() < 0.3 && row > 0 && row < newGrid.length - 1) {
        newGrid[row][col].isWall = false
      }
    }
  }

  return newGrid
}

// Horizontal Maze Generator
export const generateHorizontalMaze = (
  grid: GridNode[][],
  startNodePos: { row: number; col: number },
  finishNodePos: { row: number; col: number },
  bombNodePos: { row: number; col: number } | null,
): GridNode[][] => {
  const newGrid = JSON.parse(JSON.stringify(grid)) as GridNode[][]
  const height = newGrid.length

  for (let row = 0; row < height; row += 2) {
    for (let col = 0; col < newGrid[0].length; col++) {
      // Skip start, finish, and bomb nodes
      if (
        (row === startNodePos.row && col === startNodePos.col) ||
        (row === finishNodePos.row && col === finishNodePos.col) ||
        (bombNodePos && row === bombNodePos.row && col === bombNodePos.col)
      ) {
        continue
      }

      // Create horizontal walls
      if (row < height - 1) {
        newGrid[row][col].isWall = true
      }

      // Add random passages
      if (Math.random() < 0.3 && col > 0 && col < newGrid[0].length - 1) {
        newGrid[row][col].isWall = false
      }
    }
  }

  return newGrid
}

// Helper Functions for Recursive Division
const recursiveDivision = (
  grid: GridNode[][],
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number,
  orientation: "horizontal" | "vertical",
  startNodePos: { row: number; col: number },
  finishNodePos: { row: number; col: number },
  bombNodePos: { row: number; col: number } | null,
): void => {
  if (rowEnd - rowStart < 2 || colEnd - colStart < 2) {
    return
  }

  if (orientation === "horizontal") {
    // Generate a horizontal wall
    const rowWall = Math.floor(Math.random() * (rowEnd - rowStart)) + rowStart
    const colPassage = Math.floor(Math.random() * (colEnd - colStart)) + colStart

    // Create the wall with a passage
    for (let col = colStart; col <= colEnd; col++) {
      if (col === colPassage) continue

      // Skip start, finish, and bomb nodes
      if (
        (rowWall === startNodePos.row && col === startNodePos.col) ||
        (rowWall === finishNodePos.row && col === finishNodePos.col) ||
        (bombNodePos && rowWall === bombNodePos.row && col === bombNodePos.col)
      ) {
        continue
      }

      grid[rowWall][col].isWall = true
    }

    // Recursively divide the two regions
    recursiveDivision(
      grid,
      rowStart,
      rowWall - 1,
      colStart,
      colEnd,
      chooseOrientation(rowWall - 1 - rowStart, colEnd - colStart),
      startNodePos,
      finishNodePos,
      bombNodePos,
    )

    recursiveDivision(
      grid,
      rowWall + 1,
      rowEnd,
      colStart,
      colEnd,
      chooseOrientation(rowEnd - (rowWall + 1), colEnd - colStart),
      startNodePos,
      finishNodePos,
      bombNodePos,
    )
  } else {
    // Generate a vertical wall
    const colWall = Math.floor(Math.random() * (colEnd - colStart)) + colStart
    const rowPassage = Math.floor(Math.random() * (rowEnd - rowStart)) + rowStart

    // Create the wall with a passage
    for (let row = rowStart; row <= rowEnd; row++) {
      if (row === rowPassage) continue

      // Skip start, finish, and bomb nodes
      if (
        (row === startNodePos.row && colWall === startNodePos.col) ||
        (row === finishNodePos.row && colWall === finishNodePos.col) ||
        (bombNodePos && row === bombNodePos.row && colWall === bombNodePos.col)
      ) {
        continue
      }

      grid[row][colWall].isWall = true
    }

    // Recursively divide the two regions
    recursiveDivision(
      grid,
      rowStart,
      rowEnd,
      colStart,
      colWall - 1,
      chooseOrientation(rowEnd - rowStart, colWall - 1 - colStart),
      startNodePos,
      finishNodePos,
      bombNodePos,
    )

    recursiveDivision(
      grid,
      rowStart,
      rowEnd,
      colWall + 1,
      colEnd,
      chooseOrientation(rowEnd - rowStart, colEnd - (colWall + 1)),
      startNodePos,
      finishNodePos,
      bombNodePos,
    )
  }
}

const chooseOrientation = (height: number, width: number): "horizontal" | "vertical" => {
  if (height > width) {
    return "horizontal"
  } else if (width > height) {
    return "vertical"
  } else {
    return Math.random() < 0.5 ? "horizontal" : "vertical"
  }
}
