import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import notificationSlice from "../../notifications/notificationSlice";
const baseURL = process.env.REACT_APP_API;

const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    profile: {},
    user: {},
    idRole: null,
    notification: {},
    page: 0,
    error: [],
    statusForgotPassword: false,
    totalPages: 0,
    totalItems: 0,
  },
  reducers: {
    updateStatusForgotPassword: (state, action) => {
      state.statusForgotPassword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserList.fulfilled, (state, { payload }) => {
      state.userList = payload.data.contents;
      state.totalPages = payload.data.totalPages;
      state.totalItems = payload.data.totalItems;
    });
    builder.addCase(getUserById.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(getProfileByIdUser.fulfilled, (state, { payload }) => {
      state.profile = payload;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.profile = payload;
      toast.success("Chỉnh sửa thành công");
    });
    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      if (payload.httpCode === 200) {
        state.statusForgotPassword = true;
        toast.success(
          "Mật khẩu đã được tạo mới, vui lòng kiểm tra lại email !"
        );
      } else {
        state.statusForgotPassword = false;
        toast.error("Không tìm thấy địa chỉ email !");
      }
    });
  },
});

export const getUserList = createAsyncThunk("user/getUserList", async (arg) => {
  return await axios
    .get(
      `http://103.48.192.239:8085/api/r2s/admin/user/?no=${arg[0] - 1}&limit=${
        arg[1]
      }`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
});

// function use for get basic information match to each role through idUser
export const getUserById = createAsyncThunk("user/getUserById", async (id) => {
  return await axios
    .get(`${baseURL}/api/r2s/admin/user/get-id/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

// function use for get all of information match to each role through idUser
export const getProfileByIdUser = createAsyncThunk(
  "user/getHrByIdUser",
  async (idUser) => {
    switch (JSON.parse(sessionStorage.getItem("userPresent")).role) {
      case "Role_HR":
        return await axios
          .get(`${baseURL}/api/r2s/hr/user/${idUser}`)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
      case "Role_Partner":
        return await axios
          .get(`${baseURL}/api/r2s/partner/user/${idUser}`)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
      case "Role_Candidate":
        return await axios
          .get(`${baseURL}/api/r2s/candidate/user/${idUser}`)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
      default:
        return null;
    }
  }
);

// function use for update profile of user
export const updateUser = createAsyncThunk("user/updateUser", async (args) => {
  return await axios
    .put(`${baseURL}/api/r2s/hr/${args[1]}`, args[0], {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

// function use for feature forgot password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (emailUser) => {
    return await axios
      .get(`${baseURL}/api/user/forgotPassword/${emailUser}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (data, thunkAPI) => {
    return axios
      .delete(`${baseURL}/api/r2s/admin/user/${data}`)
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess(
            "Đã disabled người dùng thành công"
          )
        );
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue(error);
      });
  }
);

export const verifyUser = createAsyncThunk(
  "user/deleteUser",
  async (data, thunkAPI) => {
    return axios
      .get(`${baseURL}/api/r2s/admin/user/re/${data}`)
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess(
            "Đã verified người dùng thành công"
          )
        );
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue(error);
      });
  }
);
export const { updateStatusForgotPassword } = userSlice.actions;
export default userSlice;
