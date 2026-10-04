/* ==========================================================================
   ALUMNI CONNECT - Mock Data & LocalStorage Database Simulation
   Entities: STUDENTS, ALUMNI, FIELDS, MENTORSHIP_REQUESTS, SESSIONS, FEEDBACK
   ========================================================================== */

const INITIAL_DATA = {
  currentUser: {
    role: 'student', // 'student' | 'alumni' | 'admin'
    id: 101,
    name: 'Priyanshi Sharma',
    email: 'priyanshi.sharma@college.edu',
    gradYear: 2026
  },
  
  students: [
    { student_id: 101, name: 'Priyanshi Sharma', email: 'priyanshi.sharma@college.edu', grad_year: 2026 },
    { student_id: 102, name: 'Rohan Patel', email: 'rohan.patel@college.edu', grad_year: 2025 },
    { student_id: 103, name: 'Sneha Gupta', email: 'sneha.gupta@college.edu', grad_year: 2026 }
  ],
  
  alumni: [
    {
      alumni_id: 201,
      name: 'Aarav Mehta',
      email: 'aarav.mehta@gmail.com',
      job_title: 'Software Engineer @ Google',
      field_id: 1,
      field_name: 'Database & Systems',
      is_active: true,
      rating: 4.8,
      num_reviews: 14,
      bio: 'Database & Systems Specialist with 4+ years of industry experience in scalable architectures.'
    },
    {
      alumni_id: 202,
      name: 'Priya Singh',
      email: 'priya.singh@gmail.com',
      job_title: 'Data Analyst @ Amazon',
      field_id: 2,
      field_name: 'Data Science',
      is_active: true,
      rating: 4.6,
      num_reviews: 9,
      bio: 'Data Scientist focusing on BigQuery, machine learning models, and data pipeline optimization.'
    },
    {
      alumni_id: 203,
      name: 'Arjun Kapoor',
      email: 'arjun.kapoor@gmail.com',
      job_title: 'Backend Developer @ Meta',
      field_id: 1,
      field_name: 'Database & Systems',
      is_active: true,
      rating: 4.7,
      num_reviews: 11,
      bio: 'Expert in SQL optimization, indexing, Distributed Databases, and microservices architecture.'
    },
    {
      alumni_id: 204,
      name: 'Neha Rastogi',
      email: 'neha.rastogi@gmail.com',
      job_title: 'Fullstack Lead @ Stripe',
      field_id: 3,
      field_name: 'Web Development',
      is_active: true,
      rating: 4.9,
      num_reviews: 18,
      bio: 'Full stack web developer specialized in modern JavaScript ecosystems and responsive frontend engineering.'
    },
    {
      alumni_id: 205,
      name: 'Vikram Malhotra',
      email: 'vikram.malhotra@gmail.com',
      job_title: 'Product Manager @ Microsoft',
      field_id: 4,
      field_name: 'Management',
      is_active: true,
      rating: 4.8,
      num_reviews: 12,
      bio: 'Helping students transition into Product Management, Strategy, and tech leadership roles.'
    },
    {
      alumni_id: 206,
      name: 'Riddhima Sen',
      email: 'riddhima.sen@gmail.com',
      job_title: 'Senior Talent Lead @ LinkedIn',
      field_id: 5,
      field_name: 'Career Guidance',
      is_active: true,
      rating: 4.9,
      num_reviews: 15,
      bio: 'Assisting students in building standout resumes, acing technical HR interviews, and career growth.'
    },
    {
      alumni_id: 207,
      name: 'Karan Singhania',
      email: 'karan.singhania@gmail.com',
      job_title: 'Operations Lead @ Uber',
      field_id: 4,
      field_name: 'Management',
      is_active: true,
      rating: 4.7,
      num_reviews: 10,
      bio: 'Specialist in tech operations, agile project management, and strategic decision making.'
    }
  ],
  
  fields: [
    { field_id: 1, field_name: 'Database & Systems', category: 'Core Computer Science' },
    { field_id: 2, field_name: 'Data Science', category: 'AI & Analytics' },
    { field_id: 3, field_name: 'Web Development', category: 'Software Development' },
    { field_id: 4, field_name: 'Management', category: 'Business & Strategy' },
    { field_id: 5, field_name: 'Career Guidance', category: 'Professional Growth' }
  ],
  
  mentorship_requests: [
    {
      request_id: 301,
      student_id: 101,
      student_name: 'Priyanshi Sharma',
      field_id: 1,
      field_name: 'Database & Systems',
      message: 'Need guidance on SQL Query Optimization & Indexing strategies for my web application project.',
      mentor_id: 201,
      mentor_name: 'Aarav Mehta',
      status: 'Pending',
      created_at: '2026-10-02'
    },
    {
      request_id: 302,
      student_id: 103,
      student_name: 'Sneha Gupta',
      field_id: 1,
      field_name: 'Database & Systems',
      message: 'Assistance required for ER Diagram mapping and 3NF database normalization.',
      mentor_id: 201,
      mentor_name: 'Aarav Mehta',
      status: 'Pending',
      created_at: '2026-10-04'
    },
    {
      request_id: 303,
      student_id: 101,
      student_name: 'Priyanshi Sharma',
      field_id: 2,
      field_name: 'Data Science',
      message: 'Looking for advice on preparing for data analyst campus placements and technical interviews.',
      mentor_id: 202,
      mentor_name: 'Priya Singh',
      status: 'Pending',
      created_at: '2026-09-28'
    },
    {
      request_id: 304,
      student_id: 102,
      student_name: 'Rohan Patel',
      field_id: 3,
      field_name: 'Web Development',
      message: 'Code review and architecture advice for my full stack web development project.',
      mentor_id: 204,
      mentor_name: 'Neha Rastogi',
      status: 'Pending',
      created_at: '2026-10-03'
    },
    {
      request_id: 305,
      student_id: 103,
      student_name: 'Sneha Gupta',
      field_id: 3,
      field_name: 'Web Development',
      message: 'Guidance on frontend state management, responsive UI components, and API design.',
      mentor_id: 204,
      mentor_name: 'Neha Rastogi',
      status: 'Pending',
      created_at: '2026-10-04'
    },
    {
      request_id: 306,
      student_id: 101,
      student_name: 'Priyanshi Sharma',
      field_id: 4,
      field_name: 'Management',
      message: 'Advice on transitioning into Product Management and preparing PM case studies.',
      mentor_id: 205,
      mentor_name: 'Vikram Malhotra',
      status: 'Pending',
      created_at: '2026-10-03'
    },
    {
      request_id: 307,
      student_id: 102,
      student_name: 'Rohan Patel',
      field_id: 5,
      field_name: 'Career Guidance',
      message: 'Need help with resume review and preparing for HR placement interviews.',
      mentor_id: 206,
      mentor_name: 'Riddhima Sen',
      status: 'Pending',
      created_at: '2026-10-04'
    }
  ],
  
  sessions: [
    {
      session_id: 401,
      request_id: 301,
      student_name: 'Priyanshi Sharma',
      alumni_id: 201,
      mentor_name: 'Aarav Mehta',
      field_name: 'Database & Systems Mentorship',
      session_date: '2026-10-10',
      start_time: '16:00',
      end_time: '16:30',
      status: 'Scheduled'
    },
    {
      session_id: 402,
      request_id: 303,
      student_name: 'Priyanshi Sharma',
      alumni_id: 203,
      mentor_name: 'Arjun Kapoor',
      field_name: 'DBMS Normalization',
      session_date: '2026-09-25',
      start_time: '15:00',
      end_time: '15:30',
      status: 'Completed'
    },
    {
      session_id: 403,
      request_id: 302,
      student_name: 'Priyanshi Sharma',
      alumni_id: 202,
      mentor_name: 'Priya Singh',
      field_name: 'Data Science Guidance',
      session_date: '2026-10-12',
      start_time: '11:00',
      end_time: '11:30',
      status: 'Scheduled'
    }
  ],
  
  feedback: [
    {
      feedback_id: 501,
      session_id: 402,
      mentor_name: 'Arjun Kapoor',
      student_name: 'Priyanshi Sharma',
      rating: 5,
      review_text: 'Extremely helpful session! Cleared all my doubts on 3NF vs BCNF schema design and database indexing.',
      created_at: '2026-09-25'
    },
    {
      feedback_id: 502,
      session_id: 404,
      mentor_name: 'Priya Singh',
      student_name: 'Priyanshi Sharma',
      rating: 5,
      review_text: 'Fantastic guidance on BigQuery SQL analytics, machine learning pipeline design, and data analyst placement interview strategies!',
      created_at: '2026-09-29'
    },
    {
      feedback_id: 503,
      session_id: 405,
      mentor_name: 'Priya Singh',
      student_name: 'Rohan Patel',
      rating: 5,
      review_text: 'Priya gave super clear insights on Data Science portfolio projects and ML model evaluation metrics.',
      created_at: '2026-09-30'
    },
    {
      feedback_id: 504,
      session_id: 406,
      mentor_name: 'Aarav Mehta',
      student_name: 'Rohan Patel',
      rating: 5,
      review_text: 'Aarav explained system design concepts, distributed database partitioning, and query optimization very clearly.',
      created_at: '2026-10-01'
    },
    {
      feedback_id: 505,
      session_id: 407,
      mentor_name: 'Neha Rastogi',
      student_name: 'Sneha Gupta',
      rating: 5,
      review_text: 'Loved the code review! Neha gave awesome tips on React performance, modern frontend state management, and API design.',
      created_at: '2026-10-02'
    },
    {
      feedback_id: 506,
      session_id: 408,
      mentor_name: 'Vikram Malhotra',
      student_name: 'Priyanshi Sharma',
      rating: 5,
      review_text: 'Vikram gave fantastic guidance on Product Management interview case studies, product metrics, and resume framing.',
      created_at: '2026-10-03'
    },
    {
      feedback_id: 507,
      session_id: 409,
      mentor_name: 'Riddhima Sen',
      student_name: 'Rohan Patel',
      rating: 5,
      review_text: 'Riddhima provided an in-depth resume review and mock HR interview tips that boosted my confidence immensely!',
      created_at: '2026-10-04'
    },
    {
      feedback_id: 508,
      session_id: 410,
      mentor_name: 'Priya Singh',
      student_name: 'Sneha Gupta',
      rating: 5,
      review_text: 'Priya helped me prepare for data analyst technical rounds and SQL join optimization queries. Highly recommended!',
      created_at: '2026-10-01'
    },
    {
      feedback_id: 509,
      session_id: 411,
      mentor_name: 'Aarav Mehta',
      student_name: 'Priyanshi Sharma',
      rating: 5,
      review_text: 'Incredible mentor! Aarav explained indexing, query execution plans, and B-Trees in simple terms.',
      created_at: '2026-09-28'
    },
    {
      feedback_id: 510,
      session_id: 412,
      mentor_name: 'Neha Rastogi',
      student_name: 'Priyanshi Sharma',
      rating: 5,
      review_text: 'Neha gave me detailed feedback on UI design best practices and fullstack JavaScript project structure.',
      created_at: '2026-09-30'
    },
    {
      feedback_id: 511,
      session_id: 413,
      mentor_name: 'Karan Singhania',
      student_name: 'Rohan Patel',
      rating: 5,
      review_text: 'Karan shared great strategies on tech operations, agile sprint planning, and leadership principles.',
      created_at: '2026-10-02'
    },
    {
      feedback_id: 512,
      session_id: 414,
      mentor_name: 'Arjun Kapoor',
      student_name: 'Sneha Gupta',
      rating: 5,
      review_text: 'Super informative session on backend microservices architecture and distributed locking.',
      created_at: '2026-10-03'
    },
    {
      feedback_id: 513,
      session_id: 415,
      mentor_name: 'Vikram Malhotra',
      student_name: 'Sneha Gupta',
      rating: 5,
      review_text: 'Vikram provided actionable tips for transitioning into Product Strategy and cracking PM case studies.',
      created_at: '2026-10-04'
    },
    {
      feedback_id: 514,
      session_id: 416,
      mentor_name: 'Riddhima Sen',
      student_name: 'Priyanshi Sharma',
      rating: 5,
      review_text: 'Riddhima reviewed my LinkedIn profile and resume line by line. Received callbacks within a week!',
      created_at: '2026-10-04'
    },
    {
      feedback_id: 515,
      session_id: 417,
      mentor_name: 'Karan Singhania',
      student_name: 'Sneha Gupta',
      rating: 4,
      review_text: 'Very structured overview of operations management and cross-functional project execution.',
      created_at: '2026-10-05'
    }
  ]
};

// Initialize LocalStorage if empty or sync updated seed data
function initDB(force = false) {
  // Automatic migration: Purge old legacy names if present in browser localStorage
  const rawDB = localStorage.getItem('alumni_connect_db');
  if (rawDB && (rawDB.includes('Anubha') || rawDB.includes('Rahul'))) {
    localStorage.removeItem('alumni_connect_db');
  }

  if (force || !localStorage.getItem('alumni_connect_db')) {
    localStorage.setItem('alumni_connect_db', JSON.stringify(INITIAL_DATA));
  } else {
    // Self-healing check: Ensure initial active alumni, requests, and feedback exist in stored DB
    try {
      const stored = JSON.parse(localStorage.getItem('alumni_connect_db'));
      if (stored) {
        if (Array.isArray(stored.alumni)) {
          INITIAL_DATA.alumni.forEach(initA => {
            const existing = stored.alumni.find(a => a.alumni_id === initA.alumni_id);
            if (!existing) {
              stored.alumni.push(initA);
            } else {
              if (existing.alumni_id === 205) existing.is_active = true;
            }
          });
        }
        
        // Sync requests
        if (Array.isArray(stored.mentorship_requests)) {
          INITIAL_DATA.mentorship_requests.forEach(initR => {
            const existingR = stored.mentorship_requests.find(r => r.request_id === initR.request_id);
            if (!existingR) {
              stored.mentorship_requests.push(initR);
            }
          });
        } else {
          stored.mentorship_requests = INITIAL_DATA.mentorship_requests;
        }

        // Sync feedback
        if (Array.isArray(stored.feedback)) {
          INITIAL_DATA.feedback.forEach(initF => {
            const existingF = stored.feedback.find(f => f.feedback_id === initF.feedback_id);
            if (!existingF) {
              stored.feedback.push(initF);
            }
          });
        } else {
          stored.feedback = INITIAL_DATA.feedback;
        }

        localStorage.setItem('alumni_connect_db', JSON.stringify(stored));
      }
    } catch (e) {
      localStorage.setItem('alumni_connect_db', JSON.stringify(INITIAL_DATA));
    }
  }
}

// Get full Database object
function getDB() {
  initDB();
  return JSON.parse(localStorage.getItem('alumni_connect_db'));
}

// Save full Database object
function saveDB(db) {
  localStorage.setItem('alumni_connect_db', JSON.stringify(db));
}

// Helper getter functions
function getCurrentUser() {
  const db = getDB();
  return db.currentUser || INITIAL_DATA.currentUser;
}

function setCurrentUserRole(role, id = null, name = null, email = null) {
  const db = getDB();
  if (role === 'student') {
    const studentEmail = email ? email.trim() : 'priyanshi.sharma@college.edu';
    const studentName = name ? name.trim() : 'Priyanshi Sharma';

    let matchedStudent = db.students.find(s => 
      (id && String(s.student_id) === String(id)) ||
      (email && s.email.toLowerCase() === studentEmail.toLowerCase()) ||
      (name && s.name.toLowerCase() === studentName.toLowerCase())
    );

    if (!matchedStudent) {
      matchedStudent = {
        student_id: id || Date.now(),
        name: studentName,
        email: studentEmail,
        grad_year: 2026
      };
      db.students.push(matchedStudent);
    }

    db.currentUser = {
      role: 'student',
      id: matchedStudent.student_id,
      name: matchedStudent.name,
      email: matchedStudent.email,
      gradYear: matchedStudent.grad_year || 2026
    };
  } else if (role === 'alumni') {
    const alumniEmail = email ? email.trim() : '';
    const alumniName = name ? name.trim() : '';

    let matchedAlumni = null;
    if (id && String(id) !== '201') {
      matchedAlumni = db.alumni.find(a => String(a.alumni_id) === String(id));
    }
    if (!matchedAlumni && alumniEmail) {
      matchedAlumni = db.alumni.find(a => a.email.toLowerCase() === alumniEmail.toLowerCase());
    }
    if (!matchedAlumni && alumniName) {
      matchedAlumni = db.alumni.find(a => a.name.toLowerCase() === alumniName.toLowerCase());
    }
    if (!matchedAlumni && id) {
      matchedAlumni = db.alumni.find(a => String(a.alumni_id) === String(id));
    }
    if (!matchedAlumni) {
      matchedAlumni = db.alumni[0];
    }

    db.currentUser = {
      role: 'alumni',
      id: matchedAlumni.alumni_id,
      name: matchedAlumni.name,
      email: matchedAlumni.email,
      job_title: matchedAlumni.job_title || 'Alumni Mentor'
    };
  }
  saveDB(db);
}

// Register a brand new Student or Alumni user
function registerNewUser(userData) {
  const db = getDB();
  const newId = Date.now();

  if (userData.role === 'student') {
    const newStudent = {
      student_id: newId,
      name: userData.name,
      email: userData.email,
      grad_year: parseInt(userData.gradYear) || 2026
    };
    db.students.push(newStudent);

    db.currentUser = {
      role: 'student',
      id: newId,
      name: userData.name,
      email: userData.email,
      gradYear: parseInt(userData.gradYear) || 2026
    };
  } else if (userData.role === 'alumni') {
    // Map field name to field_id
    const fieldObj = db.fields.find(f => f.field_name === userData.fieldName) || db.fields[0];
    
    const newAlumni = {
      alumni_id: newId,
      name: userData.name,
      email: userData.email,
      job_title: userData.jobTitle || 'Software Engineer',
      field_id: fieldObj.field_id,
      field_name: fieldObj.field_name,
      is_active: true,
      rating: 5.0,
      num_reviews: 0,
      bio: userData.bio || `Specialist in ${fieldObj.field_name} guidance.`
    };
    db.alumni.unshift(newAlumni); // Add to top of mentor search

    db.currentUser = {
      role: 'alumni',
      id: newId,
      name: userData.name,
      email: userData.email,
      job_title: userData.jobTitle || 'Software Engineer'
    };
  }

  saveDB(db);
  return db.currentUser;
}

// Reset data back to initial seed
function resetDemoData() {
  localStorage.removeItem('alumni_connect_db');
  initDB(true);
}

// Auto-run init
initDB();
