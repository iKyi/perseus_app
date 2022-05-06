import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { setTimeout } from "timers-browserify";
import { AppThunk } from "app/store";
import { cloneDeep } from "lodash";

export type SnackbarVariants = "error" | "success" | "info";
export type BlockingTransactionsStates = "loading";

export interface IBlockingSnackbar {
  state: BlockingTransactionsStates;
  text: string;
  id: string;
}
export interface ISmallSnackbar {
  content: string;
  variant: SnackbarVariants;
  id: string;
}

export interface GlobalState {
  showComingSoon: boolean;
  publicSiteData: Record<any, any> | null;
  snackBars: ISmallSnackbar[];
  snackbarVisible: boolean;
  infoModal: string | null | ReactNode;
  loaders: string[];
  blockingSnackbars: IBlockingSnackbar[];
  depositModal: boolean;
  withdrawModal: boolean;
  pagesData: Record<string, any>;
}

const initialState: GlobalState = {
  showComingSoon: false,
  publicSiteData: null,
  snackBars: [],
  snackbarVisible: false,
  infoModal: null,
  loaders: [],
  blockingSnackbars: [],
  depositModal: false,
  withdrawModal: false,
  pagesData: {},
};

export const globalSlice = createSlice({
  name: "global",
  initialState,

  reducers: {
    addBlockingSnackbar: (state, action: PayloadAction<IBlockingSnackbar>) => {
      const { payload } = action;
      state.blockingSnackbars = [...state.blockingSnackbars, payload];
    },
    removeBlockingSnackbar: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.blockingSnackbars = state.blockingSnackbars.filter(
        (item) => item.id !== payload
      );
    },
    addLoader: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.loaders = [...state.loaders, payload];
    },
    removeLoader: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.loaders = state.loaders.filter((item) => item !== payload);
    },
    setInfoModal: (state, action: PayloadAction<string | null | ReactNode>) => {
      state.infoModal = action.payload;
    },
    setComingSoon: (state, action: PayloadAction<boolean>) => {
      state.showComingSoon = action.payload;
    },
    setPublicSiteData: (
      state,
      action: PayloadAction<Record<any, any> | null>
    ) => {
      state.publicSiteData = action.payload;
    },
    startSnackbar: (state, action: PayloadAction<ISmallSnackbar>) => {
      state.snackBars = [action.payload, ...state.snackBars];
      state.snackbarVisible = true;
    },
    closeSnackbar: (state, action: PayloadAction<string>) => {
      state.snackBars = state.snackBars.filter(
        (item) => item.id !== action.payload
      );
    },
    closeAllSnackbars: (state) => {
      state.snackBars = [];
    },
    addPageData: (
      state,
      action: PayloadAction<{ pageKey: string; data: any }>
    ) => {
      const { pageKey, data } = action.payload;
      const workingData = cloneDeep(state.pagesData);
      workingData[pageKey] = data;
      state.pagesData = workingData;
    },
  },
});

export const newSnackbar =
  (item: ISmallSnackbar): AppThunk =>
  (dispatch) => {
    dispatch(startSnackbar(item));
    setTimeout(() => {
      dispatch(closeSnackbar(item.id));
    }, 6000);
  };
export const {
  setComingSoon,
  setPublicSiteData,
  startSnackbar,
  closeSnackbar,
  setInfoModal,
  addLoader,
  removeLoader,
  addBlockingSnackbar,
  removeBlockingSnackbar,
  closeAllSnackbars,
  addPageData,
} = globalSlice.actions;

export default globalSlice.reducer;
