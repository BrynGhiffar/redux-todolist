import { increment, decrement, incrementByValue, setIncrementBy, decrementByValue } from './features/counter/counter-slice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { ChangeEvent } from 'react';

function App() {
  const value = useAppSelector(state => state.counter.value);
  const incrementBy = useAppSelector(state => state.counter.incrementBy);
  const dispatch = useAppDispatch();


  function handleIncrement() {
    dispatch(increment());
  }

  function handleSubtract() {
    dispatch(decrement());
  }

  function handleIncrementByValue() {
    dispatch(incrementByValue());
  }

  function handleDecrementByValue() {
    dispatch(decrementByValue());
  }

  function handleChangeIncrementByValue(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    dispatch(setIncrementBy(value));
  }

  return (
    <div className="App">
      <div>
        {value}
      </div>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleSubtract}>-</button>
      <button onClick={handleIncrementByValue}>Add By</button>
      <button onClick={handleDecrementByValue}>Subtract By</button>
      <input type="text" value={incrementBy} onChange={handleChangeIncrementByValue}/>
    </div>
  )
}

export default App
