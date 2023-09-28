import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const exportCalendar = createAsyncThunk<void, number>(
  'export-calendar',
  async (userId: number) => {
    const { REACT_APP_API_URL } = process.env;
    const response = await fetch(`${REACT_APP_API_URL}/user/export-events/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to download file');
    }

    const blob = await response.blob();
    const contentDisposition = response.headers.get('Content-Disposition') || '';
    const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
    const filename = matches != null && matches[1] ? matches[1] : 'Fyrs.ics';

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
);

const exportCalendarSlice = createSlice({
  name: 'export-csv',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(exportCalendar.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(exportCalendar.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(exportCalendar.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const csvActions = exportCalendarSlice.actions;
export default exportCalendarSlice.reducer;
