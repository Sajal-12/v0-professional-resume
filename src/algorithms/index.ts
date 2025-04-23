import type { GridNode } from "../types"

// Dijkstra's Algorithm
export const dijkstra = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode,
  bombNode: GridNode | null,
): GridNode[] => {
  const visitedNodesInOrder: GridNode[] = []
  startNode.distance = 0
  const unvisitedNodes = getAllNodes(grid)

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes)
    const closestNode = unvisitedNodes.shift()

    // If we encounter a wall, skip it
    if (closestNode && closestNode.isWall) continue

    // If the closest node is at a distance of infinity,
    // we must be trapped and should stop
    if (closestNode && closestNode.distance === Number.POSITIVE_INFINITY) return visitedNodesInOrder

    // If the closest node is the finish node, we're done
    if (closestNode && closestNode === finishNode) {
      visitedNodesInOrder.push(closestNode)
      return visitedNodesInOrder
    }

    // Otherwise, update the neighbors of the closest node
    if (closestNode) {
      closestNode.isVisited = true
      visitedNodesInOrder.push(closestNode)
      updateUnvisitedNeighbors(closestNode, grid)
    }
  }

  return visitedNodesInOrder
}

// A* Algorithm
export const astar = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode,
  bombNode: GridNode | null,
): GridNode[] => {
  const visitedNodesInOrder: GridNode[] = []
  startNode.distance = 0
  startNode.f = 0
  startNode.g = 0
  startNode.h = 0
  const unvisitedNodes = getAllNodes(grid)

  while (unvisitedNodes.length) {
    sortNodesByF(unvisitedNodes)
    const closestNode = unvisitedNodes.shift()

    // If we encounter a wall, skip it
    if (closestNode && closestNode.isWall) continue

    // If the closest node is at a distance of infinity,
    // we must be trapped and should stop
    if (closestNode && closestNode.f === Number.POSITIVE_INFINITY) return visitedNodesInOrder

    // If the closest node is the finish node, we're done
    if (closestNode && closestNode === finishNode) {
      visitedNodesInOrder.push(closestNode)
      return visitedNodesInOrder
    }

    // Otherwise, update the neighbors of the closest node
    if (closestNode) {
      closestNode.isVisited = true
      visitedNodesInOrder.push(closestNode)
      updateUnvisitedNeighborsAstar(closestNode, grid, finishNode)
    }
  }

  return visitedNodesInOrder
}

// Breadth-First Search
export const bfs = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode,
  bombNode: GridNode | null,
): GridNode[] => {
  const visitedNodesInOrder: GridNode[] = []
  const queue: GridNode[] = []
  startNode.distance = 0
  startNode.isVisited = true
  visitedNodesInOrder.push(startNode)
  queue.push(startNode)

  while (queue.length) {
    const currentNode = queue.shift()

    if (!currentNode) continue
    if (currentNode.isWall) continue

    if (currentNode === finishNode) return visitedNodesInOrder

    const neighbors = getUnvisitedNeighbors(currentNode, grid)
    for (const neighbor of neighbors) {
      neighbor.isVisited = true
      neighbor.previousNode = currentNode
      neighbor.distance = currentNode.distance + 1
      visitedNodesInOrder.push(neighbor)
      queue.push(neighbor)
    }
  }

  return visitedNodesInOrder
}

// Depth-First Search
export const dfs = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode,
  bombNode: GridNode | null,
): GridNode[] => {
  const visitedNodesInOrder: GridNode[] = []
  const stack: GridNode[] = []
  startNode.distance = 0
  startNode.isVisited = true
  visitedNodesInOrder.push(startNode)
  stack.push(startNode)

  while (stack.length) {
    const currentNode = stack.pop()

    if (!currentNode) continue
    if (currentNode.isWall) continue

    if (currentNode === finishNode) return visitedNodesInOrder

    const neighbors = getUnvisitedNeighbors(currentNode, grid)
    for (const neighbor of neighbors) {
      neighbor.isVisited = true
      neighbor.previousNode = currentNode
      neighbor.distance = currentNode.distance + 1
      visitedNodesInOrder.push(neighbor)
      stack.push(neighbor)
    }
  }

  return visitedNodesInOrder
}

// Helper Functions
const getAllNodes = (grid: GridNode[][]): GridNode[] => {
  const nodes: GridNode[] = []
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node)
    }
  }
  return nodes
}

const sortNodesByDistance = (unvisitedNodes: GridNode[]): void => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

const sortNodesByF = (unvisitedNodes: GridNode[]): void => {
  unvisitedNodes.sort((nodeA, nodeB) => {
    if (nodeA.f !== undefined && nodeB.f !== undefined) {
      return nodeA.f - nodeB.f
    }
    return 0
  })
}

const updateUnvisitedNeighbors = (node: GridNode, grid: GridNode[][]): void => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + neighbor.weight
    neighbor.previousNode = node
  }
}

const updateUnvisitedNeighborsAstar = (node: GridNode, grid: GridNode[][], finishNode: GridNode): void => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
  for (const neighbor of unvisitedNeighbors) {
    // g is the distance from the start node
    const g = (node.g !== undefined ? node.g : 0) + neighbor.weight

    // h is the heuristic (Manhattan distance to the finish node)
    const h = manhattanDistance(neighbor, finishNode)

    // f is the sum of g and h
    const f = g + h

    if (neighbor.f === undefined || f < neighbor.f) {
      neighbor.g = g
      neighbor.h = h
      neighbor.f = f
      neighbor.distance = f
      neighbor.previousNode = node
    }
  }
}

const getUnvisitedNeighbors = (node: GridNode, grid: GridNode[][]): GridNode[] => {
  const neighbors: GridNode[] = []
  const { row, col } = node

  if (row > 0) neighbors.push(grid[row - 1][col])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])

  return neighbors.filter((neighbor) => !neighbor.isVisited)
}

const manhattanDistance = (nodeA: GridNode, nodeB: GridNode): number => {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col)
}
