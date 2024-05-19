const admin = require('firebase-admin');
const serviceAccount = require('../service-account/service-account-file.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const courses = [
  {
    id: 2,
    name: 'Generative AI',
    instructor: 'Alice Johnson',
    description: 'Explore the world of Generative AI and learn to create AI models that generate images, text, and more.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://via.placeholder.com/150',
    duration: '6 weeks',
    schedule: 'Mondays and Wednesdays, 3:00 PM - 5:00 PM',
    location: 'Online',
    prerequisites: ['Basic Machine Learning knowledge'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Generative AI',
        content: 'Overview of Generative AI, types, and applications.'
      },
      {
        week: 2,
        topic: 'Generative Adversarial Networks (GANs)',
        content: 'Understanding GANs and implementing basic models.'
      }
    ],
    students: [
      {
        id: 201,
        name: 'Tom Clark',
        email: 'tom@example.com'
      },
      {
        id: 202,
        name: 'Jerry Willis',
        email: 'jerry@example.com'
      }
    ],
    likes: 0
  },
  {
    id: 3,
    name: 'Data Structures and Algorithms',
    instructor: 'Bob Smith',
    description: 'Learn the fundamental data structures and algorithms that are essential for computer science.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://via.placeholder.com/150',
    duration: '8 weeks',
    schedule: 'Tuesdays and Thursdays, 4:00 PM - 6:00 PM',
    location: 'Online',
    prerequisites: ['Basic Programming knowledge'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Data Structures',
        content: 'Understanding basic data structures like arrays, linked lists, and stacks.'
      },
      {
        week: 2,
        topic: 'Algorithms Basics',
        content: 'Introduction to algorithms, sorting and searching techniques.'
      }
    ],
    students: [
      {
        id: 203,
        name: 'Anna Baker',
        email: 'anna@example.com'
      },
      {
        id: 204,
        name: 'Jake Brown',
        email: 'jake@example.com'
      }
    ],
    likes: 0
  },
  {
    id: 4,
    name: 'Computer Networks',
    instructor: 'Charlie Green',
    description: 'Understand the fundamentals of computer networks, protocols, and architectures.',
    enrollmentStatus: 'In Progress',
    thumbnail: 'https://via.placeholder.com/150',
    duration: '10 weeks',
    schedule: 'Fridays, 1:00 PM - 3:00 PM',
    location: 'Online',
    prerequisites: ['Basic knowledge of Computer Systems'],
    syllabus: [
      {
        week: 1,
        topic: 'Networking Basics',
        content: 'Introduction to networking concepts, OSI model, and TCP/IP stack.'
      },
      {
        week: 2,
        topic: 'Network Protocols',
        content: 'Detailed study of various network protocols and their functionalities.'
      }
    ],
    students: [
      {
        id: 205,
        name: 'Sara White',
        email: 'sara@example.com'
      },
      {
        id: 206,
        name: 'Lucas Gray',
        email: 'lucas@example.com'
      }
    ],
    likes: 0
  },
  {
    id: 5,
    name: 'Advanced React Native',
    instructor: 'Jane Smith',
    description: 'Dive deeper into React Native and learn advanced techniques for building mobile apps.',
    enrollmentStatus: 'Closed',
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
        id: 207,
        name: 'Emily Black',
        email: 'emily@example.com'
      },
      {
        id: 208,
        name: 'David Green',
        email: 'david@example.com'
      }
    ],
    likes: 0
  }
];

const addCourses = async () => {
  const batch = db.batch();

  courses.forEach(course => {
    const courseRef = db.collection('courses').doc(`${course.id}`);
    batch.set(courseRef, course);
  });

  try {
    await batch.commit();
    console.log('Courses added successfully');
  } catch (error) {
    console.error('Error adding courses: ', error);
  }
};

addCourses();
