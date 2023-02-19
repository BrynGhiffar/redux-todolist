import { createSlice, PayloadAction, createListenerMiddleware } from "@reduxjs/toolkit";
import { useDebugValue } from "react";

interface TodoListAddItemForm {
    name: string;
}

export interface TodoListItem {
    id: number;
    name: string;
    checked: boolean;
}

interface TodoList {
    nextId: number,
    toBeAdded: TodoListAddItemForm;
    list: TodoListItem[];

    // derived values
    selectedCount: number;
    allSelected: boolean;
};

const initialState: TodoList = {
    nextId: 0,
    toBeAdded: { name: "" },
    list: [],

    // derived values
    selectedCount: 0,
    allSelected: false,
};

const todoListSlice = createSlice({
    name: "TodoList",
    initialState: initialState,
    reducers: {
        setToBeAddedName(state, action: PayloadAction<string>) {
            state.toBeAdded.name = action.payload;
        },
        addToList(state) {
            const name = state.toBeAdded.name.trim();
            if (name === "") return;

            const item = {
                id: state.nextId,
                name: name.trim(),
                checked: false
            };


            state.nextId++;
            state.list.push(item);
            state.toBeAdded.name = "";
            state.allSelected = false;
        },
        handleSelect(state, action: PayloadAction<number>) {
            const id = action.payload;
            let selectedCount = 0;
            for (let item of state.list) {
                const idMatch = item.id === id;
                if (idMatch) {
                    item.checked = !item.checked;
                }
                if (item.checked) selectedCount += 1;

            }

            state.allSelected = selectedCount === state.list.length;
            state.selectedCount = selectedCount;
        },
        updateItemById(state, action: PayloadAction<{itemId: number, newName: string}>) {
            const newName = action.payload.newName.trim();
            if (newName.trim() === "") return;
            for (let item of state.list) {
                if (item.id === action.payload.itemId) {
                    item.name = action.payload.newName;
                    break;
                }
            }
        },
        selectAll(state) {
            state.list.forEach(item => item.checked = true);
            state.selectedCount = state.list.length;
            state.allSelected = true;
        },
        deselectAll(state) {
            state.list.forEach(item => item.checked = false);
            state.allSelected = false;
            state.selectedCount = 0;
        },
        deleteSelections(state) {
            state.list = state.list.filter(item => !item.checked);
            state.allSelected = false;
            state.selectedCount = 0;
        },
        sortList(state) {
            state.list = state.list.sort((item1, item2) => +(item1.name.toLowerCase() > item2.name.toLowerCase()));
        }
    }
});

export const {
    setToBeAddedName,
    addToList,
    deleteSelections,
    handleSelect,
    selectAll,
    deselectAll,
    sortList,
    updateItemById,
} = todoListSlice.actions;
export default todoListSlice.reducer;