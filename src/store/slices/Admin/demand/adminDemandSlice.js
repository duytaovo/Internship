import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_API;

const demandSlice = createSlice({
  name: "adminDemand",
  initialState: {
    demandList: [],
    jobListName: [],
    indexCardActive: 0,
    jobDetail: {},
    jobPosition: [],
    status: "fail",
    demand: {},
    totalPages: 0,
    totalItems: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addDemand.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addDemand.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.demand = payload;
    });
    builder.addCase(getAdminListDemand.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAdminListDemand.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.demandList = payload.contents;
      state.totalPages = payload.totalPages;
      state.totalItems = payload.totalItems;
    });
  },
});

export const addDemand = createAsyncThunk("demand/addDemand", async (data) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .post(`${baseURL}/api/r2s/partner/demand`, data, axiosConfig)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

/**
 * get demand list
 * @param args[]
 * args[0]: number of current page
 * args[1]: size current item
 * @returns demand list
 */
export const getAdminListDemand = createAsyncThunk(
  "adminDemand/getAdminDemandList",
  async (args) => {
    const res = await axios
      .get(`${baseURL}/api/demand?no=${args[0] - 1}&limit=${args[1]}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
    return res;
  }
);

export const { updateIdJobActive, updateIndexCardActive } = demandSlice.actions;
export default demandSlice;
