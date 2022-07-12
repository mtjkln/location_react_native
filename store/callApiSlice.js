import { createSlice } from "@reduxjs/toolkit";

let index = 0;
const callApiSlice = createSlice({
  name: "callAPI",
  initialState: {
    currentStatus: { currentPlace: "", currentTime: "" },
    previousLocations: [],
    latitude: "",
    longitude: "",
  },
  reducers: {
    callApi: (state, action) => {
      state.currentStatus.currentPlace = action.payload.city;
      state.currentStatus.currentTime = new Date().toLocaleTimeString();
      state.latitude = action.payload.coords.latitude;
      state.longitude = action.payload.coords.longitude;
      console.log(parseInt(state.latitude) + " " + state.longitude);
      if (index !== 0) {
        state.previousLocations.push({ ...state.currentStatus });
      } else {
        index++;
      }
    },
    removeItem: (state, action) => {
      state.previousLocations = state.previousLocations.filter(
        (item) => action.payload !== item.currentTime
      );
    },
    clearAll: (state) => {
      state.previousLocations = [];
    },
  },
});

export default callApiSlice;
