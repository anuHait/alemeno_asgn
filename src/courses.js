const courses = [
  {
    id: 1,
    name: 'Introduction to React Native',
    instructor: 'John Doe',
    description: 'Learn the basics of React Native development and build your first mobile app.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://via.placeholder.com/150',
    duration: '8 weeks',
    schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
    location: 'Online',
    prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to React Native',
        content: 'Overview of React Native, setting up your development environment.'
      },
      {
        week: 2,
        topic: 'Building Your First App',
        content: 'Creating a simple mobile app using React Native components.'
      }
    ],
    students: [
      {
        id: 101,
        name: 'Alice Johnson',
        email: 'alice@example.com'
      },
      {
        id: 102,
        name: 'Bob Smith',
        email: 'bob@example.com'
      }
    ],
    likes: 0
  },
  {
    id: 2,
    name: 'Advanced React Native',
    instructor: 'Jane Smith',
    description: 'Dive deeper into React Native and learn advanced techniques for building mobile apps.',
    enrollmentStatus: 'In Progress',
    thumbnail: 'https://via.placeholder.com/150',
    duration: '10 weeks',
    schedule: 'Mondays and Wednesdays, 6:00 PM - 8:00 PM',
    location: 'Online',
    prerequisites: ['Introduction to React Native', 'Basic JavaScript knowledge'],
    syllabus: [
      {
        week: 1,
        topic: 'Advanced Components',
        content: 'Learn about advanced React Native components.'
      },
      {
        week: 2,
        topic: 'State Management',
        content: 'Implement state management in your React Native app.'
      }
    ],
    students: [
      {
        id: 103,
        name: 'Charlie Brown',
        email: 'charlie@example.com'
      },
      {
        id: 104,
        name: 'Daisy Miller',
        email: 'daisy@example.com'
      }
    ],
    likes: 0
  }
];

export default courses;
