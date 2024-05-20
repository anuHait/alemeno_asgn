import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseById } from '../redux/slices/courseSlice'; 
import dogo from '../assets/dogo.jpg';
import Navbar from './Navbar';
import { IoLocationOutline } from "react-icons/io5";
import { GiAlarmClock } from "react-icons/gi";
import { CgSandClock } from "react-icons/cg";
import { IoCalendarOutline } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Icons for expand/collapse

function CourseDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses.selectedCourse); // Access course from Redux state
  const status = useSelector((state) => state.courses.status); // Access loading status
  const [days, setDays] = useState([]);
  const [times, setTimes] = useState([]);
  const [syllabusExpanded, setSyllabusExpanded] = useState(false); // State for syllabus expansion
  const [expandedTopics, setExpandedTopics] = useState({}); // State for individual topics

  useEffect(() => {
    dispatch(fetchCourseById(id)); 
  }, [dispatch, id]);

  useEffect(() => {
    if (course && course.schedule) {
      const scheduleParts = course.schedule.split(',').map(item => item.trim());
      setDays(scheduleParts[0]);
      setTimes(scheduleParts[1]);
    }
  }, [course]);

  const toggleSyllabus = () => {
    setSyllabusExpanded(!syllabusExpanded);
  };

  const toggleTopic = (index) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (status === 'loading') {
    return <div>Loading course...</div>;
  }

  if (status === 'failed') {
    return <div>Error fetching course</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className='bg-gray-200 h-screen w-full flex flex-col gap-4 p-4'>
      <Navbar />
      <div className='flex flex-col gap-4 items-start justify-start bg-white p-10 rounded-[20px] shadow-md h-screen w-full overflow-y-scroll scrollbar-hide'>
        <h1 className='text-xl md:text-2xl font-semibold text-gray-900 ml-2'>Course Details</h1>
        <div className='flex md:flex-row flex-col gap-4 md:gap-8 items-center justify-center md:items-start md:justify-between w-full m-2'>
          <div className='flex flex-col gap-5'>
            <h1 className='text-3xl font-bold text-gray-900'>{course?.name}</h1>
            <p className='text-base font-medium text-gray-700'>{course?.description}</p>
            <h2 className='font-semibold'>Instructor: {course?.instructor}</h2>
            <div className="flex flex-row gap-2 items-center justify-start">
              <IoLocationOutline className="text-blue-600 text-xl font-bold" />
              <span>{course?.location}</span>
            </div>
            <div className="flex flex-row gap-2 items-center justify-start">
              <CgSandClock className="text-blue-600 text-xl font-bold" />
              <span>{course?.duration}</span>
            </div>
            <div className='flex flex-row gap-2 items-center justify-start'>
              <IoCalendarOutline className="text-blue-600 text-xl font-bold" />
              <span>{days}</span>
            </div>
            <div className='flex flex-row gap-2 items-center justify-start'>
              <GiAlarmClock className="text-blue-600 text-xl font-bold" />
              <span>{times}</span>
            </div>
            <div className='text-gray-600 font-semibold '>Enrollment Status <span className='text-white font-medium bg-orange-500 p-1.5 rounded-lg text-sm'>{course?.enrollmentStatus}</span></div>
          </div>
          <img src={dogo} className='w-60 h-60 md:w-72 md:h-72 rounded-lg shadow-md' alt="course thumbnail" />
        </div>
        <div className="flex flex-col gap-3 m-2 w-[80%] h-full ">
          <div className="flex flex-row justify-between items-center cursor-pointer" onClick={toggleSyllabus}>
            <h1 className="font-semibold hidden md:block md:text-xl">Syllabus for this Course</h1>
            <h1 className="font-semibold text-md block md:hidden md:text-xl">Syllabus </h1>

            <button className={`${syllabusExpanded?"bg-blue-700":"bg-blue-500"} hidden md:block text-white px-2 py-1 rounded-md`}>View Modules</button>
            <button className={`${syllabusExpanded?"bg-blue-700":"bg-blue-500"} block md:hidden text-white px-2 py-1 rounded-md`}>View Modules</button>

          </div>
          {syllabusExpanded && (
            <div className="flex flex-col gap-4 w-full">
              {course?.syllabus.map((syllabus, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div
                    className="flex flex-row justify-between items-center cursor-pointer"
                    onClick={() => toggleTopic(index)}
                  >
                    <h2 className="font-medium text-gray-600 text-md md:text-lg">{syllabus.topic}</h2>
                    {expandedTopics[index] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  {expandedTopics[index] && (
                    <div className="flex flex-col gap-1.5">
                      <p className="text-sm md:text-md ">{syllabus.content}</p>
                      <p className="text-sm md:text-md ">Week: {syllabus.week}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
