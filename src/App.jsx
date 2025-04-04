import './index.css'
import {useState,useEffect} from 'react';

function Square(props) {
  // 解包props
  const { index, updateSquares, step, updaestep,continueable } = props;
  let [value, setValue] = useState(null);

  function handleClick() {
    //检测是否继续游戏
    if (!continueable) {
      return;
    }
    // 检测是否已经被点击过
    if (value!== null) {
      return;
    }
    if (step %2== 1) {
      setValue('X');
      // 更新父组件的状态
      updaestep(step + 1);
      updateSquares(index,"X");
    }else {
      setValue('O');
      // 更新父组件的状态
      updaestep(step + 1);
      updateSquares(index,"O");
    }
    console.log({props});
  }
  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {/*   //xml内对js变量的引用需要使用花括号{} */}
      {value}
    </button>
  );
}


export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const[step,setStep] =useState(1);// 记录步数 从1开始走完是10
  const[continueGame,setContinueGame] = useState(true);
  const[turn,setTurn] = useState("X player first");
  const [winner, setWinner] = useState(null);
  // 形成闭包，函数handleClick无论在哪调用都可以访问到squares
  function UpdatearrayAndcheckwin(i,val) {
    const squaresCopy = squares.slice();
    squaresCopy[i-1] =val;
    setSquares(squaresCopy);
    console.log(squaresCopy);
    if (checkWin(squaresCopy,i)) {
      // 检测是否胜利;
      setWinner(val);
      setContinueGame(false);
      //文字修改
    }
  }

  useEffect(() => {
    // 当 state1 改变时，更新 state2
    if (!continueGame) {
      setTurn("Game over "+ winner + " win");
      return;
    }
    if (step === 10 && continueGame) {
      // 检测是否平局
      setTurn("Game over, draw");
      return;
    }
    if (step==1){
      setTurn("X player first");
      return;
    }
    setTurn(step % 2 === 1 ? "X player turn" : "O player turn");
}, [step,continueGame,winner]);
  
  return (
    <>
      <h1 class="items-center">Welcome to Tic Tac Toe</h1>
      <div className="board-row">
        <Square index={1} updateSquares={UpdatearrayAndcheckwin} step={step} updaestep={setStep} continueable={continueGame} />
        <Square index={2} updateSquares={UpdatearrayAndcheckwin} step={step} updaestep={setStep} continueable={continueGame} />
        <Square index={3} updateSquares={UpdatearrayAndcheckwin} step={step} updaestep={setStep} continueable={continueGame} />
      </div>
      <div className="board-row">
        <Square index={4} updateSquares={UpdatearrayAndcheckwin} step={step} updaestep={setStep} continueable={continueGame} />
        <Square index={5} updateSquares={UpdatearrayAndcheckwin} step={step} updaestep={setStep} continueable={continueGame} />
        <Square index={6} updateSquares={UpdatearrayAndcheckwin} step={step} updaestep={setStep} continueable={continueGame} />
      </div>
      <div className="board-row">
        <Square index={7} updateSquares={UpdatearrayAndcheckwin} step={step} updaestep={setStep} continueable={continueGame} />
        <Square index={8} updateSquares={UpdatearrayAndcheckwin} step={step} updaestep={setStep} continueable={continueGame} />
        <Square index={9} updateSquares={UpdatearrayAndcheckwin} step={step} updaestep={setStep} continueable={continueGame} />
      </div>
      <h1 class="items-center">{turn}</h1>
    </>
  );
}



//检查胜利的函数
function checkWin(board, j) {
  const i = j - 1;
  const target = board[i];
  if (!target) return false;

  // 检查行
  const row = Math.floor(i / 3);
  if (board[row * 3] === target && board[row * 3 + 1] === target && board[row * 3 + 2] === target) {
      return true;
  }

  // 检查列
  const col = i % 3;
  if (board[col] === target && board[col + 3] === target && board[col + 6] === target) {
      return true;
  }

  // 检查主对角线
  if (i === 0 || i === 4 || i === 8) {
      if (board[0] === target && board[4] === target && board[8] === target) {
          return true;
      }
  }

  // 检查副对角线
  if (i === 2 || i === 4 || i === 6) {
      if (board[2] === target && board[4] === target && board[6] === target) {
          return true;
      }
  }
  return false;
}

  