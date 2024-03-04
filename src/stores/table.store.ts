import type {TableState} from '../types/layout/table.interface';
import type {PayloadAction} from '@reduxjs/toolkit';
import type React from 'react';

import {createSlice} from '@reduxjs/toolkit';

const initialState: TableState = {
  selectedRowKeys: [],
  selectedRecord: [],
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setSelectedRowKeys(state, action: PayloadAction<React.Key[]>) {
      state.selectedRowKeys = action.payload;
    },
    setSelectedRecord(state, action: PayloadAction<any[]>) {
      state.selectedRecord = action.payload;
    },
    refreshRowKeys(state) {
      state.selectedRowKeys = [];
      state.selectedRecord = [];
    },
  },
});

export const {setSelectedRowKeys, setSelectedRecord, refreshRowKeys} =
  tableSlice.actions;

export default tableSlice.reducer;
