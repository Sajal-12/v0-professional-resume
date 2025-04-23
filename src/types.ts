export enum NodeType {
  START = "start",
  FINISH = "finish",
  WALL = "wall",
  WEIGHT = "weight",
  BOMB = "bomb",
  UNVISITED = "unvisited",
  VISITED = "visited",
  SHORTEST_PATH = "shortest-path",
}

export interface GridNode {
  row: number
  col: number
  isStart: boolean
  isFinish: boolean
  isWall: boolean
  isWeight: boolean
  isBomb: boolean
  isVisited: boolean
  isPath: boolean
  distance: number
  weight: number
  previousNode: GridNode | null
  f?: number // For A* algorithm
  g?: number // For A* algorithm
  h?: number // For A* algorithm
}
