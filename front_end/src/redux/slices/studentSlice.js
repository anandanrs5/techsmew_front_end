import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api';

export const addStudent = createAsyncThunk(
    'student/addStudent',
    async (studentData) => {
        try {
            const response = await api.post('/api/student/add', studentData);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
);

export const viewStudent = createAsyncThunk(
    'student/viewStudent',
    async () => {
        try {
            const response = await api.get(`/api/student/view`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
);

export const deleteStudent = createAsyncThunk(
    'student/deleteStudent',
    async (studentId) => {
        try {
            const response = await api.delete(`/api/student/delete/${studentId}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
);

export const editStudent = createAsyncThunk(
    'student/editStudent',
    async (updatedStudent) => {
        console.log(updatedStudent.id, " updateData.id")
        try {
            const response = await api.put(`/api/student/edit/${updatedStudent.id}`, updatedStudent);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
);

export const getStudentById = createAsyncThunk(
    'student/getStudentById',
    async (studentId) => {
        try {
            const response = await api.get(`/api/student/view/${studentId}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
);

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        student: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.student.push(action.payload);
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(viewStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(viewStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.student = action.payload;
            })
            .addCase(viewStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.student = state.student.filter(student => student.id !== action.payload.id);
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(editStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editStudent.fulfilled, (state, action) => {
                state.loading = false;
                const updatedStudent = action.payload;
                // Update properties of the single student object
                state.student = updatedStudent;
            })

            .addCase(editStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getStudentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStudentById.fulfilled, (state, action) => {
                state.loading = false;
                state.student = action.payload;
            })
            .addCase(getStudentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default studentSlice.reducer;
