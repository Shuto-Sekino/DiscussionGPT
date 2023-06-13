import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
  name: 'globalVariables',
  initialState: {
    "APIModal": {
      "isOpen": false,
      "key" : "",
    },

    "Person1": {
      "input": "",
      "output" : "The Opinion of Person 1", 
      "TL": "",
    },

    "Person2": {
      "input": "",
      "output" : "The Opinion of Person 2",
      "TL": "",
    },

    "Person3": {
      "input": "",
      "output" : "The Opinion of Person 3",
      "TL": "",
    },

    "Input": "",
    "Conclusion": "This is Conclusion.",

    "isRun"   : false,
    "globalPrompt": false,
  },
  
  reducers: {
    // 変数を追加
    // addVariable: (state, action) => {
    //   const { key, value } = action.payload;
    //   state[key] = value;
    // },

    update_APIkey: (state, action) => {
      state.APIModal.key = action.payload;
    },

    update_Input: (state, action) => {
      state.Input = action.payload;
    },

    setIsAPIModalOpen: (state, action) => {
      state.APIModal.isOpen = action.payload;
    },

    update_isRun: (state, action) => {
      state.isRun = action.payload;
    },

    update_Conclusion: (state, action) => {
      state.Conclusion = action.payload;
    },

    update_Person_output: (state, action) => {
      const { Person_name, value } = action.payload;

      console.log(Person_name, value);

      switch (Person_name) {
        case "Person1":
          state.Person1.output = value;
          break;
        case "Person2":
          state.Person2.output = value;
          break;
        case "Person3":
          state.Person3.output = value;
          break;
        default:
          break;
      }
    },
  },
})

export const { update_APIkey, setIsAPIModalOpen, update_Input, update_Conclusion } = globalSlice.actions
export const { update_isRun, update_Person_output } = globalSlice.actions
export default globalSlice.reducer


