import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CSVState, ExportCSVPayload } from '../../../../packages/export-csv/models/ExportCSV.model';

const initialState: CSVState = {
  isLoading: false,
};

export const exportCSV = createAsyncThunk<void, ExportCSVPayload, any>(
  'exportCSV',
  async ({ feature, filters }) => {
    const params = new URLSearchParams();
    const { REACT_APP_API_URL } = process.env;
    const { limit, offset, ...otherFilters } = filters;

    Object.keys(otherFilters).forEach(key => {
      params.set(key, String(otherFilters[key]));
    });

    const response = await fetch(`${REACT_APP_API_URL}/${feature}/export-csv?${params}`);

    if (!response.ok) {
      throw new Error('Failed to download file');
    }

    const blob = await response.blob();
    const contentDisposition = response.headers.get('Content-Disposition') || '';
    const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
    const filename = matches != null && matches[1] ? matches[1] : `${feature}.csv`;

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
);

const exportCSVSlice = createSlice({
  name: 'export-csv',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(exportCSV.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(exportCSV.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(exportCSV.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const csvActions = exportCSVSlice.actions;
export default exportCSVSlice.reducer;
