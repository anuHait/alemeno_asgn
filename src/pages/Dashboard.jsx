import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../redux/slices/userSlice';
import Loader from '../components/Loader';
import CourseCard from '../components/CourseCard';
function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const userStatus = useSelector((state) => state.user.status);
    const error = useSelector((state) => state.user.error);
  //console.log(user)
  //console.log("userStatus",userStatus)
    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUserById("101"));
        }
    }, [userStatus, dispatch]);

    if (userStatus === 'loading') {
        return (<div className='flex items-center justify-center h-screen w-screen'><Loader/></div>);
    }

    if (userStatus === 'failed') {
        return <div>{error}</div>;
    }

    return (
        <div className='bg-gray-200 h-screen w-full flex flex-col gap-4 p-4'>
            <Navbar />
            <div className='flex flex-col gap-4 items-start justify-start bg-white p-7 md:p-10 rounded-[20px] shadow-md overflow-y-scroll scrollbar-hide w-full' >
                <h1 className='text-xl md:text-2xl font-semibold text-gray-900 '>Dashboard</h1>
              {  user && (
                    <div className='flex flex-col gap-7 w-full'>
                    <div className='flex flex-col items-start justify-start gap-4'>
                        <h1 className='text-xl md:text-3xl font-bold text-gray-900 '>Welcome, {user.name}</h1>
                        <p className='text-lg text-gray-700 '>Email: {user.email}</p>
                        </div>
                        <h2 className='text-lg md:text-xl font-semibold text-gray-700'>Enrolled courses</h2>
                        <div className='flex flex-col gap-4 '>
                            {user.enrolledCourses.map(course => (
                              <CourseCard key={course.courseRef.id} course={course} />  
                            ))}
                            </div>
                    </div>
                )
            }
            </div>
            
        </div>
    );
}

export default Dashboard;
