import type {PayloadAction} from '@reduxjs/toolkit';

import {createSlice} from '@reduxjs/toolkit';
import {ILockerItem} from '../types/locker/locker';
import {IRangePicker} from '../types/layout/index.interface';

interface LockerState {
  dataLocker: ILockerItem | null;
  rangePicker?: IRangePicker;
}

const initialState: LockerState = {
  dataLocker: null,
  rangePicker: undefined,
};

const lockerSlice = createSlice({
  name: 'locker',
  initialState,
  reducers: {
    setDataLocker(state, action: PayloadAction<ILockerItem>) {
      state.dataLocker = action.payload;
    },
    setRangePicker(state, action: PayloadAction<IRangePicker>) {
      state.rangePicker = action.payload;
    },
  },
});

export const {setDataLocker, setRangePicker} = lockerSlice.actions;

export default lockerSlice.reducer;
