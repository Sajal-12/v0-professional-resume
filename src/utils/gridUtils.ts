import type { GridNode } from "../types"

export const createInitialGrid = (
  rowCount: number,
  colCount: number,
  startNodePos: { row: number; col: number },
  finishNodePos: { row: number; col: number },
  bombNodePos: { row: number; col: number } | null,
): GridNode[][] => {
  const grid: GridNode[][] = []

  for (let row = 0; row < rowCount; row++) {
    const currentRow: GridNode[] = []
    for (let col = 0; col < colCount; col++) {
      currentRow.push(createNode(row, col, startNodePos, finishNodePos, bombNodePos))
    }
    grid.push(currentRow)
  }

  return grid
}

const createNode = (
  row: number,
  col: number,
  startNodePos: { row: number; col: number },
  finishNodePos: { row: number; col: number },
  bombNodePos: { row: number; col: number } | null,
): GridNode => {
  return {
    row,
    col,
    isStart: row === startNodePos.row && col === startNodePos.col,
    isFinish: row === finishNodePos.row && col === finishNodePos.col,
    isBomb: bombNodePos !== null && row === bombNodePos.row && col === bombNodePos.col,
    isWall: false,
    isWeight: false,
    isVisited: false,
    isPath: false,
    distance: Number.POSITIVE_INFINITY,
    weight: 1,
    previousNode: null,
  }
}

export const getNewGridWithWallToggled = (grid: GridNode[][], row: number, col: number): GridNode[][] => {
  const newGrid = [...grid]
  const node = newGrid[row][col]

  // Don't toggle if it's a special node
  if (node.isStart || node.isFinish || node.isBomb) return grid

  // Remove weight if it exists
  if (node.isWeight) {
    node.isWeight = false
    node.weight = 1
  }

  const newNode = {
    ...node,
    isWall: !node.isWall,
  }

  newGrid[row][col] = newNode
  return newGrid
}

export const getNewGridWithWeightToggled = (grid: GridNode[][], row: number, col: number): GridNode[][] => {
  const newGrid = [...grid]
  const node = newGrid[row][col]

  // Don't toggle if it's a special node or wall
  if (node.isStart || node.isFinish || node.isBomb || node.isWall) return grid

  const newNode = {
    ...node,
    isWeight: !node.isWeight,
    weight: node.isWeight ? 1 : 15, // Toggle between normal and weighted
  }

  newGrid[row][col] = newNode
  return newGrid
}
