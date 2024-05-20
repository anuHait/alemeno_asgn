import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, getDoc, updateDoc, doc } from 'firebase/firestore'; 
import db from '../../services/firebase'; 

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (userId) => {
    try {
        const stringUserId = String(userId); 
        const userCollection = collection(db, 'users');
        const userSnapshot = await getDocs(userCollection);
        const userDoc = userSnapshot.docs.find(doc => doc.id === stringUserId);
        if (userDoc) {
            const userData = { id: userDoc.id, ...userDoc.data() };
            const enrolledCourses = await Promise.all(userData.enrolledCourses.map(async (course) => {
                const courseDoc = await getDoc(course.courseRef);
                return { ...course, courseDetails: courseDoc.exists() ? courseDoc.data() : null };
            }));
            return { ...userData, enrolledCourses };
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return Promise.reject(error);
    }
});

export const updateCourseProgress = createAsyncThunk('user/updateCourseProgress', async ({ userId, courseId }) => {
    try {
        const stringUserId = String(userId); 
        const userDocRef = doc(db, 'users', stringUserId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const updatedCourses = userData.enrolledCourses.map(course => {
                if (course.courseRef.id === courseId) {
                    return { ...course, completed: true, progress: 100 };
                }
                return course;
            });
            await updateDoc(userDocRef, { enrolledCourses: updatedCourses });
            return { id: userDoc.id, ...userData, enrolledCourses: updatedCourses };
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error("Error updating course progress:", error);
        return Promise.reject(error);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateCourseProgress.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCourseProgress.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(updateCourseProgress.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;
