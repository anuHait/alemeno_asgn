import React from "react";
import { GoStopwatch } from "react-icons/go";
import { useDispatch } from "react-redux";
import { updateCourseProgress } from "../redux/slices/userSlice";

function CourseCard({ id, course }) {
  const dispatch = useDispatch();

  const formatDate = (timestamp) => {
    if (!timestamp) return "No due date";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  const handleMark = () => {
    dispatch(updateCourseProgress({ userId: "101", courseId: course.courseRef.id }))
    .then(() => {
      window.location.reload();
    })
    .catch(error => {
      console.error('Error updating course likes:', error);
    });
  };

  return (
    <div className="border border-blue-700 w-[95%] flex flex-row gap-3 md:gap-6 p-3.5 rounded-[20px] shadow items-center">
      <img src={course?.courseDetails?.thumbnail} className="h-24 w-28 md:h-32 md:w-36 rounded-lg bg-gray-400"></img>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-row items-start justify-between w-full">
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
            {course?.courseDetails?.name ?? "Unknown Course"}
          </h1>
          <button
            className="hidden lg:block bg-blue-600 text-white p-1.5 font-semibold rounded-md ml-auto"
            onClick={handleMark}
            disabled={course?.completed}
          >
            {course?.completed ? "Completed" : "Mark as Completed"}
          </button>
          <button
            className="bg-blue-600 block lg:hidden text-white p-1.5 font-semibold rounded-md ml-auto"
            onClick={handleMark}
            disabled={course?.completed}
          >
            {course?.completed ? "Done" : "Mark"}
          </button>
        </div>
        <p className="text-md md:text-lg font-medium text-gray-500">
          {course?.courseDetails?.instructor ?? "Unknown Instructor"}
        </p>
        <div className="flex flex-row gap-2 items-center justify-start">
          <GoStopwatch className="text-lg md:text-xl text-blue-600" />
          {formatDate(course?.dueDate)}
        </div>
        <div className="w-full rounded-full h-2.5 bg-gray-600 mt-2">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${course?.progress ?? 0}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
