"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import "./App.css"
import Grid from "./components/Grid"
import Navbar from "./components/Navbar"
import Legend from "./components/Legend"
import Tutorial from "./components/Tutorial"
import { NodeType, type GridNode } from "./types"
import { createInitialGrid, getNewGridWithWallToggled, getNewGridWithWeightToggled } from "./utils/gridUtils"
import { dijkstra, astar, bfs, dfs } from "./algorithms"
import {
  generateRandomMaze,
  generateRecursiveDivisionMaze,
  generateVerticalMaze,
  generateHorizontalMaze,
} from "./utils/mazeGenerators"

const App: React.FC = () => {
  const [grid, setGrid] = useState<GridNode[][]>([])
  const [mouseIsPressed, setMouseIsPressed] = useState(false)
  const [currentNodeType, setCurrentNodeType] = useState<NodeType>(NodeType.WALL)
  const [startNodePos, setStartNodePos] = useState({ row: 10, col: 15 })
  const [finishNodePos, setFinishNodePos] = useState({ row: 10, col: 35 })
  const [bombNodePos, setbombNodePos] = useState<{ row: number; col: number } | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(10) // ms delay between visualization steps
  const [showTutorial, setShowTutorial] = useState(true)
  const [tutorialStep, setTutorialStep] = useState(1)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("dijkstra")

  const ROW_COUNT = 25
  const COL_COUNT = 50

  useEffect(() => {
    const initialGrid = createInitialGrid(ROW_COUNT, COL_COUNT, startNodePos, finishNodePos, bombNodePos)
    setGrid(initialGrid)
  }, [])

  const handleMouseDown = (row: number, col: number) => {
    if (isRunning) return

    const node = grid[row][col]

    // Handle special nodes (start, finish, bomb)
    if (node.isStart) {
      // Start dragging start node
      setMouseIsPressed(true)
      setCurrentNodeType(NodeType.START)
      return
    } else if (node.isFinish) {
      // Start dragging finish node
      setMouseIsPressed(true)
      setCurrentNodeType(NodeType.FINISH)
      return
    } else if (node.isBomb) {
      // Start dragging bomb node
      setMouseIsPressed(true)
      setCurrentNodeType(NodeType.BOMB)
      return
    }

    // Handle wall or weight placement
    setMouseIsPressed(true)
    if (currentNodeType === NodeType.WALL) {
      const newGrid = getNewGridWithWallToggled(grid, row, col)
      setGrid(newGrid)
    } else if (currentNodeType === NodeType.WEIGHT) {
      const newGrid = getNewGridWithWeightToggled(grid, row, col)
      setGrid(newGrid)
    }
  }

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed || isRunning) return

    if (currentNodeType === NodeType.START) {
      // Update start node position
      const newGrid = createInitialGrid(ROW_COUNT, COL_COUNT, { row, col }, finishNodePos, bombNodePos)
      setStartNodePos({ row, col })
      setGrid(newGrid)
    } else if (currentNodeType === NodeType.FINISH) {
      // Update finish node position
      const newGrid = createInitialGrid(ROW_COUNT, COL_COUNT, startNodePos, { row, col }, bombNodePos)
      setFinishNodePos({ row, col })
      setGrid(newGrid)
    } else if (currentNodeType === NodeType.BOMB) {
      // Update bomb node position
      const newGrid = createInitialGrid(ROW_COUNT, COL_COUNT, startNodePos, finishNodePos, { row, col })
      setbombNodePos({ row, col })
      setGrid(newGrid)
    } else if (currentNodeType === NodeType.WALL) {
      const newGrid = getNewGridWithWallToggled(grid, row, col)
      setGrid(newGrid)
    } else if (currentNodeType === NodeType.WEIGHT) {
      const newGrid = getNewGridWithWeightToggled(grid, row, col)
      setGrid(newGrid)
    }
  }

  const handleMouseUp = () => {
    setMouseIsPressed(false)
    setCurrentNodeType(NodeType.WALL) // Reset to default
  }

  const clearBoard = () => {
    if (isRunning) return
    const newGrid = createInitialGrid(ROW_COUNT, COL_COUNT, startNodePos, finishNodePos, bombNodePos)
    setGrid(newGrid)
  }

  const clearWallsAndWeights = () => {
    if (isRunning) return
    const newGrid = [...grid]
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COL_COUNT; col++) {
        if (newGrid[row][col].isWall) {
          newGrid[row][col].isWall = false
        }
        if (newGrid[row][col].isWeight) {
          newGrid[row][col].isWeight = false
          newGrid[row][col].weight = 1
        }
      }
    }
    setGrid(newGrid)
  }

  const clearPath = () => {
    if (isRunning) return
    const newGrid = [...grid]
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COL_COUNT; col++) {
        const node = newGrid[row][col]
        const newNode = {
          ...node,
          distance: Number.POSITIVE_INFINITY,
          isVisited: false,
          previousNode: null,
          isPath: false,
          f: undefined,
          g: undefined,
          h: undefined,
        }
        newGrid[row][col] = newNode
      }
    }
    setGrid(newGrid)
  }

  const getNodesInShortestPathOrder = useCallback((finishNode: GridNode): GridNode[] => {
    const nodesInShortestPathOrder = []
    let currentNode: GridNode | null = finishNode
    while (currentNode !== null && currentNode.previousNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode)
      currentNode = currentNode.previousNode
    }
    return nodesInShortestPathOrder
  }, [])

  const animateShortestPath = useCallback((nodesInShortestPathOrder: GridNode[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i]
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid]
          const newNode = {
            ...node,
            isPath: true,
          }
          newGrid[node.row][node.col] = newNode
          return newGrid
        })

        if (i === nodesInShortestPathOrder.length - 1) {
          setIsRunning(false)
        }
      }, 50 * i)
    }
  }, [])

  const animateAlgorithm = useCallback(
    (visitedNodesInOrder: GridNode[], nodesInShortestPathOrder: GridNode[]) => {
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
          setTimeout(() => {
            animateShortestPath(nodesInShortestPathOrder)
          }, speed * i)
          return
        }
        setTimeout(() => {
          const node = visitedNodesInOrder[i]
          setGrid((prevGrid) => {
            const newGrid = [...prevGrid]
            const newNode = {
              ...node,
              isVisited: true,
            }
            newGrid[node.row][node.col] = newNode
            return newGrid
          })
        }, speed * i)
      }
    },
    [speed, animateShortestPath],
  )

  const visualizeAlgorithm = () => {
    if (isRunning) return
    clearPath()
    setIsRunning(true)

    const startNode = grid[startNodePos.row][startNodePos.col]
    const finishNode = grid[finishNodePos.row][finishNodePos.col]
    const bombNode = bombNodePos ? grid[bombNodePos.row][bombNodePos.col] : null

    let visitedNodesInOrder: GridNode[] = []

    switch (selectedAlgorithm) {
      case "dijkstra":
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode, bombNode)
        break
      case "astar":
        visitedNodesInOrder = astar(grid, startNode, finishNode, bombNode)
        break
      case "bfs":
        visitedNodesInOrder = bfs(grid, startNode, finishNode, bombNode)
        break
      case "dfs":
        visitedNodesInOrder = dfs(grid, startNode, finishNode, bombNode)
        break
      default:
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode, bombNode)
    }

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder)
  }

  const generateMaze = (mazeType: string) => {
    if (isRunning) return
    clearBoard()

    let newGrid
    switch (mazeType) {
      case "random":
        newGrid = generateRandomMaze(grid, startNodePos, finishNodePos, bombNodePos)
        break
      case "recursiveDivision":
        newGrid = generateRecursiveDivisionMaze(grid, startNodePos, finishNodePos, bombNodePos)
        break
      case "vertical":
        newGrid = generateVerticalMaze(grid, startNodePos, finishNodePos, bombNodePos)
        break
      case "horizontal":
        newGrid = generateHorizontalMaze(grid, startNodePos, finishNodePos, bombNodePos)
        break
      default:
        newGrid = generateRandomMaze(grid, startNodePos, finishNodePos, bombNodePos)
    }

    setGrid(newGrid)
  }

  const addBomb = () => {
    if (isRunning) return
    if (bombNodePos) {
      // Remove bomb if it already exists
      setbombNodePos(null)
      const newGrid = createInitialGrid(ROW_COUNT, COL_COUNT, startNodePos, finishNodePos, null)
      setGrid(newGrid)
    } else {
      // Add bomb at center of grid
      const newBombPos = { row: Math.floor(ROW_COUNT / 2), col: Math.floor(COL_COUNT / 2) }
      setbombNodePos(newBombPos)
      const newGrid = createInitialGrid(ROW_COUNT, COL_COUNT, startNodePos, finishNodePos, newBombPos)
      setGrid(newGrid)
    }
  }

  const setNodeType = (type: NodeType) => {
    setCurrentNodeType(type)
  }

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed)
  }

  const handleAlgorithmChange = (algorithm: string) => {
    setSelectedAlgorithm(algorithm)
  }

  const handleTutorialNext = () => {
    if (tutorialStep < 9) {
      setTutorialStep(tutorialStep + 1)
    } else {
      setShowTutorial(false)
    }
  }

  const handleTutorialPrevious = () => {
    if (tutorialStep > 1) {
      setTutorialStep(tutorialStep - 1)
    }
  }

  const handleTutorialSkip = () => {
    setShowTutorial(false)
  }

  return (
    <div className="app">
      <Navbar
        visualizeAlgorithm={visualizeAlgorithm}
        clearBoard={clearBoard}
        clearPath={clearPath}
        clearWallsAndWeights={clearWallsAndWeights}
        addBomb={addBomb}
        generateMaze={generateMaze}
        onAlgorithmChange={handleAlgorithmChange}
        onSpeedChange={handleSpeedChange}
        isRunning={isRunning}
      />
      <Legend setNodeType={setNodeType} currentNodeType={currentNodeType} />
      <Grid
        grid={grid}
        mouseIsPressed={mouseIsPressed}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseUp={handleMouseUp}
      />
      {showTutorial && (
        <Tutorial
          step={tutorialStep}
          onNext={handleTutorialNext}
          onPrevious={handleTutorialPrevious}
          onSkip={handleTutorialSkip}
        />
      )}
    </div>
  )
}

export default App
