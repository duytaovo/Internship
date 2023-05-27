import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../config/api/apiConfig";
import { toast } from "react-toastify";
import axios from "axios";

const baseURL = process.env.REACT_APP_API;

const loginSlice = createSlice({
  name: "login",
  initialState: {
    status: "idle",
    user: {},
    error: {},
    profile: JSON.parse(sessionStorage.getItem("userPresent")) || {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload?.token) {
          state.status = "success";
          toast.success("Bạn đã đăng nhập thành công!");
          sessionStorage.setItem("userPresent", JSON.stringify(action.payload));
          localStorage.setItem("userPresent", JSON.stringify(action.payload));
        } else {
          state.status = "fail";
          toast.error("Tài khoản hoặc mật khẩu không đúng!");
        }
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "success";
        } else {
          state.status = "fail";
        }
      });
  },
});

export const loginUser = createAsyncThunk("login/loginUser", async (data) => {
  const res = await api
    .post(`${baseURL}/api/signin`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response.data;
    });
  return res;
});

export const updateUserPassword = createAsyncThunk(
  "login/updateUserPassword",
  async (data) => {
    const { token, dataChangePassword } = data;
    const res = await axios
      .put(`${baseURL}/api/user/changePassword`, dataChangePassword, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response.data;
      });
    return res;
  }
);

export default loginSlice;
