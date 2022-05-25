import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteReducer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addNewAnecdote(state, action) {
      state.push(action.payload);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      return state.map((vote) =>
        vote.id !== action.payload.id ? vote : action.payload
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const object = {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes + 1,
    };
    const votedAnecdote = await anecdoteService.vote(object);
    dispatch(updateAnecdote(votedAnecdote));
  };
};

export const {
  addNewAnecdote,
  appendAnecdote,
  setAnecdotes,
  updateAnecdote,
} = anecdoteReducer.actions;
export default anecdoteReducer.reducer;
