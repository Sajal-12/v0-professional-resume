"use client"

import type React from "react"
import { useState, useCallback } from "react"
import "./Navbar.css"

interface NavbarProps {
  visualizeAlgorithm: () => void
  clearBoard: () => void
  clearPath: () => void
  clearWallsAndWeights: () => void
  addBomb: () => void
  generateMaze: (mazeType: string) => void
  onAlgorithmChange: (algorithm: string) => void
  onSpeedChange: (speed: number) => void
  isRunning: boolean
}

const Navbar: React.FC<NavbarProps> = ({
  visualizeAlgorithm,
  clearBoard,
  clearPath,
  clearWallsAndWeights,
  addBomb,
  generateMaze,
  onAlgorithmChange,
  onSpeedChange,
  isRunning,
}) => {
  const [showAlgorithmDropdown, setShowAlgorithmDropdown] = useState(false)
  const [showMazeDropdown, setShowMazeDropdown] = useState(false)
  const [showSpeedDropdown, setShowSpeedDropdown] = useState(false)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Dijkstra")
  const [selectedSpeed, setSelectedSpeed] = useState("Average")

  const handleAlgorithmSelect = useCallback(
    (algorithm: string, algorithmName: string) => {
      setSelectedAlgorithm(algorithmName)
      onAlgorithmChange(algorithm)
      setShowAlgorithmDropdown(false)
    },
    [onAlgorithmChange],
  )

  const handleMazeSelect = useCallback(
    (mazeType: string) => {
      generateMaze(mazeType)
      setShowMazeDropdown(false)
    },
    [generateMaze],
  )

  const handleSpeedSelect = useCallback(
    (speed: number, speedName: string) => {
      setSelectedSpeed(speedName)
      onSpeedChange(speed)
      setShowSpeedDropdown(false)
    },
    [onSpeedChange],
  )

  return (
    <nav className="navbar">
      <div className="navbar-brand">Pathfinding Visualizer</div>

      <div className="navbar-menu">
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => setShowAlgorithmDropdown(!showAlgorithmDropdown)}
            disabled={isRunning}
          >
            Algorithms <span className="dropdown-arrow">▼</span>
          </button>
          {showAlgorithmDropdown && (
            <div className="dropdown-content">
              <button onClick={() => handleAlgorithmSelect("dijkstra", "Dijkstra")}>Dijkstra's Algorithm</button>
              <button onClick={() => handleAlgorithmSelect("astar", "A*")}>A* Search</button>
              <button onClick={() => handleAlgorithmSelect("bfs", "BFS")}>Breadth-First Search</button>
              <button onClick={() => handleAlgorithmSelect("dfs", "DFS")}>Depth-First Search</button>
            </div>
          )}
        </div>

        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => setShowMazeDropdown(!showMazeDropdown)}
            disabled={isRunning}
          >
            Mazes & Patterns <span className="dropdown-arrow">▼</span>
          </button>
          {showMazeDropdown && (
            <div className="dropdown-content">
              <button onClick={() => handleMazeSelect("random")}>Random Maze</button>
              <button onClick={() => handleMazeSelect("recursiveDivision")}>Recursive Division</button>
              <button onClick={() => handleMazeSelect("vertical")}>Vertical Maze</button>
              <button onClick={() => handleMazeSelect("horizontal")}>Horizontal Maze</button>
            </div>
          )}
        </div>

        <button className="navbar-button" onClick={addBomb} disabled={isRunning}>
          Add Bomb
        </button>

        <button className="navbar-button visualize-button" onClick={visualizeAlgorithm} disabled={isRunning}>
          Visualize!
        </button>

        <button className="navbar-button" onClick={clearBoard} disabled={isRunning}>
          Clear Board
        </button>

        <button className="navbar-button" onClick={clearWallsAndWeights} disabled={isRunning}>
          Clear Walls & Weights
        </button>

        <button className="navbar-button" onClick={clearPath} disabled={isRunning}>
          Clear Path
        </button>

        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => setShowSpeedDropdown(!showSpeedDropdown)}
            disabled={isRunning}
          >
            Speed: {selectedSpeed} <span className="dropdown-arrow">▼</span>
          </button>
          {showSpeedDropdown && (
            <div className="dropdown-content">
              <button onClick={() => handleSpeedSelect(5, "Fast")}>Fast</button>
              <button onClick={() => handleSpeedSelect(10, "Average")}>Average</button>
              <button onClick={() => handleSpeedSelect(25, "Slow")}>Slow</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
