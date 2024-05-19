const admin = require('firebase-admin');
const serviceAccount = require('../service-account/service-account-file.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const users = [
  {
    id: "101",
    name: "Daniel Smith",
    email: "daniel@example.com",
    enrolledCourses: [
      {
        courseRef: db.collection('courses').doc('1'),
        progress: 45,
        completed: false
      },
      {
        courseRef: db.collection('courses').doc('3'),
        progress: 80,
        completed: false
      },
      {
        courseRef: db.collection('courses').doc('4'),
        progress: 35,
        completed: false
      }
    ]
  }
];

const addUsers = async () => {
  const batch = db.batch();

  users.forEach(user => {
    const userRef = db.collection('users').doc(user.id);
    batch.set(userRef, user);
  });

  try {
    await batch.commit();
    console.log('Users added successfully');
  } catch (error) {
    console.error('Error adding users: ', error);
  }
};

addUsers();
