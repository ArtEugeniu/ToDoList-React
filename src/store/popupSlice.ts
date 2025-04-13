import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPopupSliceType {
  isOpen: boolean
  type: 'deleteSingle' | 'deleteAll' | 'edit' | null
  message: string
  id: string
}

const initialState: IPopupSliceType = {
  isOpen: false,
  type: null,
  message: '',
  id: ''
}


const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopup: (state, action: PayloadAction<IPopupSliceType>) => {
      return {
        isOpen: action.payload.isOpen,
        type: action.payload.type,
        message: action.payload.message,
        id: action.payload.id
      }
    },

    closePopup: () => initialState,
  }
})

export default popupSlice.reducer;
export const { openPopup, closePopup } = popupSlice.actions;