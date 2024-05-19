import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCourses ,updateCourseLikes} from '../redux/slices/courseSlice';
import  db  from '../services/firebase';
import { doc, updateDoc,getDocs,collection } from 'firebase/firestore';
const CourseListing = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const courseStatus = useSelector((state) => state.courses.status);
  const error = useSelector((state) => state.courses.error);

  useEffect(() => {
    if (courseStatus === 'idle') {
      dispatch(fetchCourses());
    }
  }, [courseStatus, dispatch,courses]);

  if (courseStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (courseStatus === 'failed') {
    return <div>{error}</div>;
  }

  const handleLike = (courseId, currentLikes) => {
    dispatch(updateCourseLikes({ courseId, likes: currentLikes }))
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating course likes:', error);
      });
  };
  
  
  
  return (
    <div>
      <h1>Course Listing</h1>
      <ul className='flex flex-col'>
        {courses?.map((course) => (
          <li key={course.id} className='p-3 border-2 border-blue-500 '>
            <div className='flex gap-7'>
              <Link to={`/${course.id}`}>{course.name} - {course.instructor}</Link>
              <button onClick={() => handleLike(course.id, course.likes)}>{course.likes} Likes</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseListing;
