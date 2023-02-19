import { increment, decrement, incrementByValue, setIncrementBy, decrementByValue } from './features/counter/counter-slice';
import { TodoListItem, addToList, deleteSelections, deselectAll, handleSelect, selectAll, setToBeAddedName, sortList, updateItemById } from './features/todolist/todolist-slice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { KeyboardEvent, useCallback, useState } from 'react';



function App() {
  const value = useAppSelector(state => state.counter.value);
  const incrementBy = useAppSelector(state => state.counter.incrementBy);
  const todoListItems = useAppSelector(state => state.todoList.list);
  const todoListToBeAdded = useAppSelector(state => state.todoList.toBeAdded);
  const todoList = useAppSelector(state => state.todoList);
  const dispatch = useAppDispatch();
  const [ searchTextBuffer, setSearchTextBuffer ] = useState("");

  function TodoListItem({ item }: { item: TodoListItem }) {
    const [itemName, setItemName] = useState(item.name);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editBuffer, setEditBuffer ] = useState("");
    

    const saveOnClickHandler = useCallback(() => {
      dispatch(updateItemById({ itemId: item.id, newName: editBuffer }))
      setIsEditing(_ => false);
    }, [item , editBuffer]);

    const inputOnChangeHandler = useCallback((value: string) => {
      setEditBuffer(_ => value);
    }, []);

    const editOnClickHandler = useCallback(() => {
      setEditBuffer(_ => item.name);
      setIsEditing(_ => true);
    }, [item])

    return (
      <div key={item.id}>
        <input type="checkbox" checked={item.checked} onChange={() => dispatch(handleSelect(item.id))}/>
        {
          isEditing ? 
          (
            <>
              <input
                type="text"
                value={editBuffer}
                onChange={({ target }) => inputOnChangeHandler(target.value)}
              />
              <button onClick={saveOnClickHandler}>Save</button>
            </>
          ) : (
            <>
              <label>{item.name}</label>
              <button onClick={editOnClickHandler}>Edit</button>
            </>
          )
        }
      </div>
    )
  }

  function handleSelectToggle() {
    if (todoList.allSelected) {
      dispatch(deselectAll());
    } else {
      dispatch(selectAll());
    }
  }

  function inputHandleOnKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      dispatch(addToList());
    }
  }

  return (
    <div className="App">
      {/* <div>
        {value}
      </div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByValue())}>Add By</button>
      <button onClick={() => dispatch(decrementByValue())}>Subtract By</button>
      <input type="text" value={incrementBy} onChange={({ target: t }) => dispatch(setIncrementBy(t.value))}/> */}
      <div>
        <h1>To Do List</h1>
        Search: <input placeholder="Search" type="text" value={searchTextBuffer} onChange={({ target }) => setSearchTextBuffer(_ => target.value)}/><br/>
        <input type="text" value={todoListToBeAdded.name} onChange={({ target: t }) => dispatch(setToBeAddedName(t.value))} onKeyDown={inputHandleOnKeyDown}/>
        <button onClick={() => dispatch(addToList())}>Add Item</button>
        <button onClick={handleSelectToggle}>{todoList.allSelected ? "Deselect All" : "Select All"}</button>
        <button onClick={() => dispatch(deleteSelections())} disabled={todoList.selectedCount === 0}>Delete Selection</button>
        <button onClick={() => dispatch(sortList())}>Sort Items</button>
        {todoListItems.filter(item => item.name.toLowerCase().includes(searchTextBuffer.toLowerCase())).map(item => (<TodoListItem item={item}/>))}
      </div>
      <div>Selected items: {todoList.selectedCount}</div>
    </div>
  )
}

export default App
