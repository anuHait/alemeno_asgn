import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'; 
import db from '../../services/firebase'; 

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  try {
    const coursesCollection = collection(db, 'courses');
    const coursesSnapshot = await getDocs(coursesCollection);
    return coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching courses:", error);
    // Handle the error in your reducer (optional)
    return Promise.reject(error);
  }
});

// Fetch a course by ID
export const fetchCourseById = createAsyncThunk('courses/fetchCourseById', async (courseId) => {
  try {
    const coursesCollection = collection(db, 'courses');
    const courseSnapshot = await getDocs(coursesCollection);
    const course = courseSnapshot.docs.find(doc => doc.id === courseId);
    return { id: course.id, ...course.data() };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return Promise.reject(error);
  }
  
});

// Update course likes  
export const updateCourseLikes = createAsyncThunk('courses/updateCourseLikes', async ({ courseId, likes }) => {
  try {
    const stringCourseId = String(courseId); 
    const courseRef = doc(db, 'courses', stringCourseId);
    const updatedLikes = likes + 1;
    await updateDoc(courseRef, { likes: updatedLikes });
    return { courseId: stringCourseId, likes: updatedLikes };
  } catch (error) {
    console.error('Error updating course likes:', error);
    throw error;
  }
});



// Define the courses slice for Redux
const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    selectedCourse: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCourseLikes.fulfilled, (state, action) => {
        const { courseId, likes } = action.payload;
        if (state.courses.length === 0) {
          console.error('Courses data not loaded yet!');
          return;
        }
        const foundCourse = state.courses.find(course => course.id === courseId);
        if (foundCourse) {
          foundCourse.likes = likes;
        }
      });
  },
});

export default coursesSlice.reducer;
