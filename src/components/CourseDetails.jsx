import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseById } from '../redux/slices/courseSlice'; // Import fetchCourseById

function CourseDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses.selectedCourse); // Access course from Redux state
  const status = useSelector((state) => state.courses.status); // Access loading status

  useEffect(() => {
    dispatch(fetchCourseById(id)); 
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading course...</div>;
  }

  if (status === 'failed') {
    return <div>Error fetching course</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }
  console.log(course);
  return (
    <div>
      <h1>{course.name}</h1>
      <img src={course.thumbnail} alt={course.name} />
      <p>Instructor: {course.instructor}</p>
      <p>Description: {course.description}</p>
     
    </div>
  );
}

export default CourseDetails;
