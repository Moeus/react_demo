import './index.css'
import { useState} from 'react';

function Square(props) {
  // 解包props
  const { index, updateSquares, step, updaestep } = props;
  let [value, setValue] = useState(null);

  function handleClick() {
    // 检测是否已经点击
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
  const[step,setStep] =useState(1);
  // 形成闭包，函数handleClick无论在哪调用都可以访问到squares
  function handleClick(i,val) {
    const squaresCopy = squares.slice();
    squaresCopy[i-1] =val;
    setSquares(squaresCopy);
    console.log(squaresCopy);
  }
  return (
    <>
      <h1 class="items-center">Welcome to Tic Tac Toe</h1>
      <div className="board-row">
        <Square index={1} updateSquares={handleClick} step={step} updaestep={setStep} />
        <Square index={2} updateSquares={handleClick} step={step} updaestep={setStep} />
        <Square index={3} updateSquares={handleClick} step={step} updaestep={setStep} />
      </div>
      <div className="board-row">
        <Square index={4} updateSquares={handleClick} step={step} updaestep={setStep} />
        <Square index={5} updateSquares={handleClick} step={step} updaestep={setStep} />
        <Square index={6} updateSquares={handleClick} step={step} updaestep={setStep} />
      </div>
      <div className="board-row">
        <Square index={7} updateSquares={handleClick} step={step} updaestep={setStep} />
        <Square index={8} updateSquares={handleClick} step={step} updaestep={setStep} />
        <Square index={9} updateSquares={handleClick} step={step} updaestep={setStep} />
      </div>
    </>
  );
}
