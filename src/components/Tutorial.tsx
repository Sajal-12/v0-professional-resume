"use client"

import type React from "react"
import "./Tutorial.css"

interface TutorialProps {
  step: number
  onNext: () => void
  onPrevious: () => void
  onSkip: () => void
}

const Tutorial: React.FC<TutorialProps> = ({ step, onNext, onPrevious, onSkip }) => {
  const getTutorialContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2>Welcome to Pathfinding Visualizer!</h2>
            <p>This short tutorial will walk you through all of the features of this application.</p>
            <p>
              If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press
              "Next"!
            </p>
            <div className="tutorial-image">
              {/* Use a simple div with styling instead of an image that might not load */}
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  background: "linear-gradient(45deg, #00bcd4, #ff9800)",
                  borderRadius: "50%",
                  margin: "0 auto",
                }}
                aria-label="Pathfinding Visualizer Logo"
              ></div>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <h2>What is a Pathfinding Algorithm?</h2>
            <p>
              At its core, a pathfinding algorithm seeks to find the shortest path between two points. This application
              visualizes various pathfinding algorithms in action, and more!
            </p>
            <p>
              All of the algorithms on this application are adapted for a 2D grid, where 90-degree turns have a "cost"
              of 1 and movements from a node to another have a "cost" of 1.
            </p>
          </>
        )
      case 3:
        return (
          <>
            <h2>Picking an Algorithm</h2>
            <p>Choose an algorithm from the "Algorithms" dropdown menu.</p>
            <p>
              Note that some algorithms are <strong>weighted</strong> (taking into account the cost of movement), while
              others are <strong>unweighted</strong>. Additionally, some algorithms are <strong>guaranteed</strong> to
              find the shortest path, while others are not.
            </p>
          </>
        )
      case 4:
        return (
          <>
            <h2>Adding Walls and Weights</h2>
            <p>
              Click and drag on the grid to add walls. Walls are impenetrable, meaning that a path cannot cross through
              them.
            </p>
            <p>
              Click the "Weight Node" in the legend and then click and drag to add weights. Weights have a "cost" of 15,
              making it more costly for the algorithm to pass through.
            </p>
          </>
        )
      case 5:
        return (
          <>
            <h2>Adding a Bomb</h2>
            <p>
              Click the "Add Bomb" button to add a bomb to the grid. The bomb will create a second path from the start
              node to the target node, passing through the bomb.
            </p>
            <p>You can drag the bomb just like the start and target nodes.</p>
          </>
        )
      case 6:
        return (
          <>
            <h2>Generating Mazes</h2>
            <p>Click the "Mazes & Patterns" dropdown to generate different types of mazes and patterns on the grid.</p>
            <p>These mazes and patterns can serve as obstacles for the pathfinding algorithms.</p>
          </>
        )
      case 7:
        return (
          <>
            <h2>Visualizing and More</h2>
            <p>Click the "Visualize!" button to visualize the selected algorithm.</p>
            <p>
              Use the "Clear Board", "Clear Walls & Weights", and "Clear Path" buttons to clear different elements from
              the grid.
            </p>
          </>
        )
      case 8:
        return (
          <>
            <h2>Adjusting Speed</h2>
            <p>Use the "Speed" dropdown to adjust the visualization speed.</p>
          </>
        )
      case 9:
        return (
          <>
            <h2>Enjoy!</h2>
            <p>
              I hope you have fun playing around with this visualization tool. Feel free to explore all the different
              algorithms and see how they work!
            </p>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-modal">
        <div className="tutorial-content">
          {getTutorialContent()}
          <div className="tutorial-step">{step}/9</div>
        </div>
        <div className="tutorial-buttons">
          <button className="tutorial-button" onClick={onSkip}>
            Skip Tutorial
          </button>
          <div>
            {step > 1 && (
              <button className="tutorial-button" onClick={onPrevious}>
                Previous
              </button>
            )}
            {step < 9 && (
              <button className="tutorial-button" onClick={onNext}>
                Next
              </button>
            )}
            {step === 9 && (
              <button className="tutorial-button" onClick={onSkip}>
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutorial
