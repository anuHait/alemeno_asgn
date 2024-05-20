import React, { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCourses ,updateCourseLikes} from '../redux/slices/courseSlice';
import { BsSearch } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { GoArrowUpRight } from "react-icons/go";

import Navbar from '../components/Navbar';
const CourseListing = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const courseStatus = useSelector((state) => state.courses.status);
  const error = useSelector((state) => state.courses.error);
  const [searchTerm, setSearchTerm] = useState('');

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
  
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  
  return (
    <div className='bg-gray-200 h-full w-full flex flex-col gap-4 p-4'>
      <Navbar />
      <div className='flex flex-col gap-4 items-start justify-start bg-white p-4 rounded-[20px] shadow-md overflow-y-scroll scrollbar-hide'>
      <h1 className='text-xl md:text-2xl font-semibold text-gray-900 ml-2'>Course Listing</h1>
      {/*Search bar */}
      <div className="flex items-center flex-row gap-3 justify-start  p-3.5 rounded-xl shadow- h-12 border-2 border-gray-300 w-[95%] m-2">
      <BsSearch className='text-xl text-gray-700 font-semibold  '/>
        <input type="text" placeholder="Search for courses" className="p-2 outline-none cursor-text w-full rounded-lg"
        value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
      {/*Course Listing */}
      <div className='flex flex-col w-full'>
      {
        filteredCourses?.map((course) => (
      
      <div key={course.id} className="shadow-md h-fit flex flex-row items-center justify-start rounded-[20px]  gap-6 p-4 w-full m-2 hover:border ease-in duration-150 hover:border-blue-600">
      <div className='h-28 w-32 md:h-36 md:w-40 rounded-lg  bg-gray-400'></div>
      <div className='flex flex-col gap-1 w-full'>
      <div className='flex flex-row items-start justify-between'>
      <h1 className='text-lg md:text-xl lg:text-2xl font-semibold'>{course.name}</h1>
      <Link to={`/${course.id}`} className='ml-auto'>
                      <button className='hidden md:block bg-blue-600 text-white p-1.5 font-semibold rounded-md'>View Details</button>
                    </Link>
                    <Link to={`/${course.id}`}><GoArrowUpRight className='text-blue-600 font-semibold text-2xl block md:hidden' /></Link>
      </div>
      <p className='italic text-xs md:text-lg text-gray-700'>{course.description}</p>
      <h2 className='text-md md:text-lg font-semibold'>Instructor : {course.instructor}</h2>
      <div className='flex flex-row gap-3 items-center justify-start'>
      <div className='flex flex-row gap-1 item-center justify-start w-24 p-1 md:p-1.5 rounded-lg border-2 border-orange-200'>
      <p className='text-xs md:text-sm p-2 w-fit h-7 flex items-center justify-center rounded-lg font-semibold bg-orange-500 text-white'>{course.likes}</p>
      <span className='text-sm md:text-lg font-semibold text-gray-500'>Likes</span>
      </div>
      <button className='flex flex-row gap-1 item-center justify-start p-2.5 w-fit rounded-lg bg-blue-500' onClick={() => handleLike(course.id, course.likes)}>
      <AiFillLike className='text-white text-md md:text-lg'/>
      <span className='text-sm md:text-md hidden md:block font-semibold text-white'>Like this Course</span>
      </button>
      </div>
      
      </div>
      </div>
  ))}
      </div>
     
      </div>
    </div>
  );
};

export default CourseListing;
