import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUser = createAsyncThunk("pegawai/getAllUser", async () => {
  const response = await axios.get(
    "https://61601920faa03600179fb8d2.mockapi.io/pegawai"
  );
  return response;
});

export const addPegawai = createAsyncThunk(
  "pegawai/addPegawai",
  async (pegawai) => {
    const response = await axios.post(
      "https://61601920faa03600179fb8d2.mockapi.io/pegawai",
      pegawai
    );
    return response;
  }
);

export const updatePegawai = createAsyncThunk(
  "pegawai/updatePegawai",
  async (pegawai) => {
    const response = await axios.put(
      `https://61601920faa03600179fb8d2.mockapi.io/pegawai/${pegawai.id}`,
      pegawai
    );
    return response;
  }
);

export const deletePegawai = createAsyncThunk(
  "pegawai/deletePegawai",
  async (id) => {
    await axios.delete(
      `https://61601920faa03600179fb8d2.mockapi.io/pegawai/${id}`
    );
    alert("data berhasil di hapus");

    return id;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.users = action.payload.data;
        console.log(action.payload.data);
      })
      .addCase(addPegawai.fulfilled, (state, action) => {
        state.users.push(action.payload.data);
        window.location.reload();
      })
      .addCase(deletePegawai.fulfilled, (state, action) => {
        state.users = state.users.filter((item) => item.id !== action.payload);
        window.location.reload();
      })
      .addCase(updatePegawai.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (pegawai) => pegawai.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default usersSlice.reducer;
