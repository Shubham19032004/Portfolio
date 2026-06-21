export type Ball = {
  x: number
  y: number
  dx: number
  dy: number
}

export type Paddle ={
    x:number
    y:number
    width:number 
    height:number
}
export type GameState={
    ball: Ball
    leftPaddle: Paddle
    rightPaddle: Paddle
    leftScore: number
    rightScore: number
}