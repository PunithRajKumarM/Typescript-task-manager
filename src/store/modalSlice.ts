import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  modal: boolean;
  editModal: boolean;
}

const initialState: ModalState = { modal: false, editModal: false };

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state) {
      state.modal = true;
      return state;
    },
    hideModal(state) {
      state.modal = false;
      return state;
    },
    showEditModal(state) {
      state.editModal = true;
      return state;
    },
    hideEditModal(state) {
      state.editModal = false;
      return state;
    },
  },
});

export const { showModal, hideModal, showEditModal, hideEditModal } =
  modalSlice.actions;

export default modalSlice.reducer;
