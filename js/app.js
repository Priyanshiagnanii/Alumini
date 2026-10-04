/* ==========================================================================
   ALUMNI CONNECT - Frontend Interactions & Dynamic Rendering Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initGlobalUI();
  initPageSpecificLogic();
});

/* Toast Notification Utility */
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item ${type}`;
  
  let iconClass = 'fa-circle-info';
  if (type === 'success') iconClass = 'fa-circle-check';
  if (type === 'error') iconClass = 'fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <div style="flex: 1; font-size: 0.9rem; font-weight: 600; color: var(--text-main);">${message}</div>
    <button onclick="this.parentElement.remove()" style="color: var(--text-muted); font-size: 0.85rem;"><i class="fa-solid fa-xmark"></i></button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* Global UI Setup & Navigation */
function initGlobalUI() {
  const currentUser = getCurrentUser();

  // Update navbar user profile indicators if available
  const userAvatarElems = document.querySelectorAll('.user-avatar-sm');
  const userNameElems = document.querySelectorAll('.user-info-name');
  const userRoleElems = document.querySelectorAll('.user-info-role');

  const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();

  userAvatarElems.forEach(el => el.textContent = initials);
  userNameElems.forEach(el => el.textContent = currentUser.name);
  userRoleElems.forEach(el => {
    if (currentUser.role === 'student') {
      el.textContent = 'Student (2026)';
    } else {
      el.textContent = currentUser.job_title || 'Alumni Mentor';
    }
  });

  // Active link highlight
  const rawCurrent = (window.location.pathname.split('/').pop() || 'index').toLowerCase();
  const currentPath = rawCurrent.split('#')[0].split('?')[0].replace(/\.html$/, '') || 'index';
  
  const sidebarLinks = document.querySelectorAll('.sidebar-item a');
  sidebarLinks.forEach(link => {
    const rawHref = (link.getAttribute('href') || '').toLowerCase();
    const href = rawHref.split('#')[0].split('?')[0].replace(/\.html$/, '');
    if (href && (href === currentPath || (currentPath === 'index' && href === 'index'))) {
      link.parentElement.classList.add('active');
    } else {
      link.parentElement.classList.remove('active');
    }
  });

  // Setup Modal Close Handlers
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) modal.classList.remove('show');
    });
  });
}

/* Login Modal Handler */
function openLoginModal(role = 'student') {
  const modal = document.getElementById('loginModal');
  if (!modal) return;

  const roleSelect = document.getElementById('loginRoleSelect');
  if (roleSelect) {
    roleSelect.value = role;
    onLoginRoleChange(role);
  }
  modal.classList.add('show');
}

function onLoginRoleChange(role) {
  const nameInput = document.getElementById('loginName');
  const emailInput = document.getElementById('loginEmail');
  if (role === 'student') {
    if (nameInput) nameInput.value = 'Priyanshi Sharma';
    if (emailInput) emailInput.value = 'priyanshi.sharma@college.edu';
  } else {
    if (nameInput) nameInput.value = 'Priya Singh';
    if (emailInput) emailInput.value = 'priya.singh@gmail.com';
  }
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const role = document.getElementById('loginRoleSelect').value;
  const nameInput = document.getElementById('loginName');
  const name = nameInput ? nameInput.value : (role === 'student' ? 'Priyanshi Sharma' : 'Priya Singh');
  const email = document.getElementById('loginEmail').value;

  if (role === 'student') {
    setCurrentUserRole('student', null, name, email || 'priyanshi.sharma@college.edu');
    showToast(`Welcome back, ${name.split(' ')[0]}! Redirecting to Student Dashboard...`, 'success');
    setTimeout(() => window.location.href = 'student-dashboard.html', 800);
  } else {
    setCurrentUserRole('alumni', null, name, email || 'priya.singh@gmail.com');
    showToast(`Welcome back, ${name.split(' ')[0]}! Redirecting to Alumni Dashboard...`, 'success');
    setTimeout(() => window.location.href = 'alumni-dashboard.html', 800);
  }
}

function handleSignUpSubmit(event) {
  event.preventDefault();
  
  const role = document.getElementById('signUpRole') ? document.getElementById('signUpRole').value : 'student';
  const name = document.getElementById('signUpName').value;
  const email = document.getElementById('signUpEmail').value;
  const gradYear = document.getElementById('signUpGradYear') ? document.getElementById('signUpGradYear').value : '2026';
  const jobTitle = document.getElementById('signUpJobTitle') ? document.getElementById('signUpJobTitle').value : '';
  const fieldName = document.getElementById('signUpFieldName') ? document.getElementById('signUpFieldName').value : 'DBMS';
  const bio = document.getElementById('signUpBio') ? document.getElementById('signUpBio').value : '';

  const newUser = registerNewUser({
    role,
    name,
    email,
    gradYear,
    jobTitle,
    fieldName,
    bio
  });

  showToast(`Account registered successfully! Welcome aboard, ${name.split(' ')[0]} 🎉`, 'success');

  setTimeout(() => {
    if (role === 'student') {
      window.location.href = 'student-dashboard.html';
    } else {
      window.location.href = 'alumni-dashboard.html';
    }
  }, 1000);
}

function handleLogout() {
  showToast('Logged out successfully.', 'info');
  setTimeout(() => window.location.href = 'index.html', 800);
}

/* Page Specific Router Logic */
function initPageSpecificLogic() {
  const rawPath = (window.location.pathname.split('/').pop() || 'index').toLowerCase();
  let path = rawPath.split('#')[0].split('?')[0];

  if (path.endsWith('.html')) {
    path = path.slice(0, -5);
  }

  if (path === '' || path === 'index') {
    renderLandingStats();
  } else if (path === 'student-dashboard') {
    renderStudentDashboard();
  } else if (path === 'requests') {
    renderRequestsPage();
  } else if (path === 'sessions') {
    renderSessionsPage();
  } else if (path === 'feedback') {
    renderFeedbackPage();
  } else if (path === 'alumni-dashboard') {
    renderAlumniDashboard();
  } else if (path === 'alumni-sessions') {
    renderAlumniSessionsPage();
  } else if (path === 'profile') {
    renderProfilePage();
  }
}

/* 1. LANDING PAGE */
function renderLandingStats() {
  const db = getDB();
  const activeMentors = db.alumni.filter(a => a.is_active).length;
  const requestsCount = db.mentorship_requests.length;
  const sessionsCount = db.sessions.length;

  const activeMentorsEl = document.getElementById('statActiveMentors');
  const requestsEl = document.getElementById('statRequests');
  const sessionsEl = document.getElementById('statSessions');

  if (activeMentorsEl) activeMentorsEl.textContent = activeMentors;
  if (requestsEl) requestsEl.textContent = requestsCount;
  if (sessionsEl) sessionsEl.textContent = sessionsCount;

  // Render Top Mentors preview grid
  const mentorsContainer = document.getElementById('topMentorsGrid');
  if (mentorsContainer) {
    const topMentors = [...db.alumni].sort((a, b) => b.rating - a.rating).slice(0, 3);
    mentorsContainer.innerHTML = topMentors.map(m => `
      <div class="mentor-card">
        <div class="mentor-header">
          <div class="mentor-avatar">${m.name.split(' ').map(n=>n[0]).join('')}</div>
          <div class="mentor-title-info">
            <h3 class="mentor-name">${m.name}</h3>
            <p class="mentor-job">${m.job_title}</p>
            <span class="mentor-field-tag">${m.field_name}</span>
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">${m.bio}</p>
        <div class="mentor-stats-row">
          <div class="mentor-rating">
            <i class="fa-solid fa-star"></i> ${m.rating.toFixed(1)}
            <span class="mentor-reviews">(${m.num_reviews} reviews)</span>
          </div>
          <span class="badge ${m.is_active ? 'badge-active' : 'badge-inactive'}">
            ${m.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
        <button class="btn btn-outline-primary btn-sm" style="width: 100%;" onclick="openLoginModal('student')">
          <i class="fa-solid fa-paper-plane"></i> Connect as Student
        </button>
      </div>
    `).join('');
  }
}

/* 2. STUDENT DASHBOARD */
function renderStudentDashboard() {
  const db = getDB();
  const currentUser = getCurrentUser();

  // Stats
  const myRequests = db.mentorship_requests.filter(r => r.student_id === currentUser.id);
  const upcomingSessions = db.sessions.filter(s => s.status === 'Scheduled');
  const completedSessions = db.sessions.filter(s => s.status === 'Completed');

  document.getElementById('statMyRequestsCount').textContent = myRequests.length;
  document.getElementById('statUpcomingSessionsCount').textContent = upcomingSessions.length;
  document.getElementById('statCompletedSessionsCount').textContent = completedSessions.length;

  // Default mentor listing (show all or DBMS by default)
  findMatchingMentors();
}

function findMatchingMentors() {
  const db = getDB();
  const selectedField = document.getElementById('fieldSelect').value;
  const container = document.getElementById('matchingMentorsContainer');
  if (!container) return;

  let mentors = db.alumni.filter(a => a.is_active);

  if (selectedField && selectedField !== 'ALL') {
    mentors = mentors.filter(a => a.field_name === selectedField);
  }

  // Sort highest rated first
  mentors.sort((a, b) => b.rating - a.rating);

  if (mentors.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--surface); border-radius: var(--radius-xl); border: 1px dashed var(--border);">
        <i class="fa-solid fa-user-slash" style="font-size: 2.5rem; color: var(--text-light); margin-bottom: 1rem;"></i>
        <h4 style="font-weight: 700; color: var(--text-main);">No active mentors found for "${selectedField}"</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem;">Try selecting another field or view all active alumni.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = mentors.map(m => `
    <div class="mentor-card">
      <div class="mentor-header">
        <div class="mentor-avatar">${m.name.split(' ').map(n=>n[0]).join('')}</div>
        <div class="mentor-title-info">
          <h3 class="mentor-name">${m.name}</h3>
          <p class="mentor-job">${m.job_title}</p>
          <span class="mentor-field-tag">${m.field_name}</span>
        </div>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">${m.bio}</p>
      <div class="mentor-stats-row">
        <div class="mentor-rating">
          <i class="fa-solid fa-star"></i> ${m.rating.toFixed(1)}
          <span class="mentor-reviews">(${m.num_reviews} reviews)</span>
        </div>
        <span class="badge ${m.is_active ? 'badge-active' : 'badge-inactive'}">
          <i class="fa-solid fa-circle" style="font-size: 0.5rem; margin-right: 0.2rem;"></i> ${m.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>
      <button class="btn btn-primary" style="width: 100%;" onclick="openRequestModal(${m.alumni_id}, '${m.name}', '${m.field_name}')">
        <i class="fa-solid fa-calendar-plus"></i> Request Mentorship
      </button>
    </div>
  `).join('');
}

function openRequestModal(alumniId, alumniName, fieldName) {
  const modal = document.getElementById('requestModal');
  if (!modal) return;

  document.getElementById('modalMentorId').value = alumniId;
  document.getElementById('modalMentorName').textContent = alumniName;
  document.getElementById('modalFieldName').textContent = fieldName;
  
  const studentMsg = document.getElementById('studentMsgInput');
  const findFormMsg = document.getElementById('helpTextArea') ? document.getElementById('helpTextArea').value : '';
  if (studentMsg && findFormMsg) {
    studentMsg.value = findFormMsg;
  }

  modal.classList.add('show');
}

function submitMentorshipRequest(event) {
  event.preventDefault();
  const db = getDB();
  const currentUser = getCurrentUser();

  const mentorId = parseInt(document.getElementById('modalMentorId').value);
  const mentor = db.alumni.find(a => a.alumni_id === mentorId);
  const message = document.getElementById('studentMsgInput').value || 'Need guidance on mentorship topics.';

  const newRequest = {
    request_id: Date.now(),
    student_id: currentUser.id,
    student_name: currentUser.name,
    field_id: mentor ? mentor.field_id : 1,
    field_name: mentor ? mentor.field_name : 'DBMS',
    message: message,
    mentor_id: mentorId,
    mentor_name: mentor ? mentor.name : 'Alumni Mentor',
    status: 'Pending',
    created_at: new Date().toISOString().split('T')[0]
  };

  db.mentorship_requests.unshift(newRequest);
  saveDB(db);

  document.getElementById('requestModal').classList.remove('show');
  showToast(`Mentorship request submitted to ${mentor ? mentor.name : 'Mentor'}! Status: Pending`, 'success');

  // Refresh page lists if on student dashboard
  const path = window.location.pathname.split('/').pop();
  if (path === 'student-dashboard.html') {
    renderStudentDashboard();
  }
}

/* 3. STUDENT REQUESTS PAGE */
function renderRequestsPage() {
  const db = getDB();
  const currentUser = getCurrentUser();
  const requests = db.mentorship_requests.filter(r => 
    String(r.student_id) === String(currentUser.id) ||
    (r.student_name && r.student_name.toLowerCase().trim() === currentUser.name.toLowerCase().trim()) ||
    currentUser.role === 'student'
  );

  const tbody = document.getElementById('requestsTableBody');
  if (!tbody) return;

  if (requests.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">No mentorship requests submitted yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = requests.map(r => {
    const isAccepted = r.status === 'Accepted';
    const hasSession = db.sessions.some(s => s.request_id === r.request_id);

    return `
      <tr>
        <td><strong>#REQ-${r.request_id.toString().slice(-4)}</strong></td>
        <td><span class="mentor-field-tag">${r.field_name}</span></td>
        <td>
          <div style="font-weight: 700;">${r.mentor_name}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); max-width: 280px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${r.message}</div>
        </td>
        <td>${r.created_at}</td>
        <td>
          <span class="badge badge-${(r.status || 'Pending').toLowerCase()}">${r.status || 'Pending'}</span>
        </td>
        <td>
          ${isAccepted ? (
            hasSession ? `
              <a href="sessions.html" class="btn btn-success btn-sm">
                <i class="fa-solid fa-calendar-check"></i> View Session Call
              </a>
            ` : `
              <button class="btn btn-outline-primary btn-sm" onclick="openScheduleModal(${r.request_id}, ${r.mentor_id}, '${r.mentor_name}', '${r.field_name}')">
                <i class="fa-solid fa-clock"></i> Schedule Slot
              </button>
            `
          ) : `<span style="font-size: 0.85rem; color: var(--text-muted);">${r.status === 'Pending' ? 'Awaiting Mentor Response' : 'Declined'}</span>`}
        </td>
      </tr>
    `;
  }).join('');
}

/* Modal for scheduling a slot with conflict detection */
function openScheduleModal(requestId, mentorId, mentorName, fieldName) {
  const modal = document.getElementById('scheduleModal');
  if (!modal) return;

  document.getElementById('schRequestId').value = requestId;
  document.getElementById('schMentorId').value = mentorId;
  document.getElementById('schMentorName').textContent = mentorName;
  document.getElementById('schFieldName').textContent = fieldName;

  modal.classList.add('show');
}

function handleScheduleSubmit(event) {
  event.preventDefault();
  const db = getDB();
  const requestId = parseInt(document.getElementById('schRequestId').value);
  const mentorId = parseInt(document.getElementById('schMentorId').value);
  const mentorName = document.getElementById('schMentorName').textContent;
  const fieldName = document.getElementById('schFieldName').textContent;
  
  const dateInput = document.getElementById('schDate').value;
  const timeInput = document.getElementById('schTime').value;

  // DEMO CONFLICT CHECK:
  // If mentor is Aarav Mehta and date is 2026-10-10 and time is 16:00, or any existing session slot conflict
  const existingConflict = db.sessions.find(s => 
    s.alumni_id === mentorId && 
    s.session_date === dateInput && 
    s.start_time === timeInput
  );

  if (existingConflict) {
    showToast('This mentor is unavailable at this time slot. Please choose another slot.', 'error');
    return;
  }

  // Add new session
  const currentUser = getCurrentUser();
  const newSession = {
    session_id: Date.now(),
    request_id: requestId,
    student_name: currentUser.name,
    alumni_id: mentorId,
    mentor_name: mentorName,
    field_name: fieldName,
    session_date: dateInput,
    start_time: timeInput,
    end_time: calculateEndTime(timeInput),
    status: 'Scheduled'
  };

  db.sessions.push(newSession);

  // Update request status to Accepted if not already
  const reqObj = db.mentorship_requests.find(r => r.request_id === requestId);
  if (reqObj) reqObj.status = 'Accepted';

  saveDB(db);

  document.getElementById('scheduleModal').classList.remove('show');
  showToast(`Mentorship session scheduled with ${mentorName} on ${dateInput} at ${timeInput}!`, 'success');

  const path = window.location.pathname.split('/').pop();
  if (path === 'requests.html') renderRequestsPage();
  if (path === 'sessions.html') renderSessionsPage();
}

function calculateEndTime(startTimeStr) {
  const [h, m] = startTimeStr.split(':').map(Number);
  const endMin = (m + 30) % 60;
  const endHour = h + Math.floor((m + 30) / 60);
  return `${endHour < 10 ? '0' + endHour : endHour}:${endMin < 10 ? '0' + endMin : endMin}`;
}

/* 4. MY SESSIONS PAGE */
function renderSessionsPage() {
  const db = getDB();
  const container = document.getElementById('sessionsContainer');
  if (!container) return;

  const sessions = db.sessions.filter(s => s.status === 'Scheduled');

  if (sessions.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; background: var(--surface); border-radius: var(--radius-xl); border: 1px dashed var(--border);">
        <i class="fa-regular fa-calendar-xmark" style="font-size: 2.5rem; color: var(--text-light); margin-bottom: 1rem;"></i>
        <h4 style="font-weight: 700;">No upcoming sessions</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Once an alumni accepts your mentorship request, scheduled sessions will appear here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = sessions.map(s => `
    <div class="card" style="margin-bottom: 1.25rem;">
      <div class="card-header-flex">
        <div>
          <span class="badge badge-scheduled" style="margin-bottom: 0.5rem;">${s.status}</span>
          <h3 style="font-size: 1.15rem; font-weight: 800;">${s.field_name} Mentorship Session</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Mentor: <strong>${s.mentor_name}</strong> | Student: <strong>${s.student_name}</strong></p>
        </div>
        <button class="btn btn-outline-primary btn-sm" onclick="showToast('Zoom Meeting link: https://meet.alumniconnect.edu/room-${s.session_id}', 'info')">
          <i class="fa-solid fa-video"></i> View Meeting Link
        </button>
      </div>
      <div style="display: flex; gap: 2rem; background: var(--surface-secondary); padding: 0.85rem 1.25rem; border-radius: var(--radius-md); font-size: 0.875rem;">
        <div><i class="fa-regular fa-calendar" style="color: var(--primary); margin-right: 0.4rem;"></i> <strong>Date:</strong> ${s.session_date}</div>
        <div><i class="fa-regular fa-clock" style="color: var(--primary); margin-right: 0.4rem;"></i> <strong>Time:</strong> ${s.start_time} - ${s.end_time}</div>
        <div><i class="fa-solid fa-hourglass-half" style="color: var(--primary); margin-right: 0.4rem;"></i> <strong>Duration:</strong> 30 Minutes</div>
      </div>
      <div style="margin-top: 1rem; text-align: right;">
        <button class="btn btn-success btn-sm" onclick="completeSession(${s.session_id})">
          <i class="fa-solid fa-check"></i> Mark Completed & Give Feedback
        </button>
      </div>
    </div>
  `).join('');
}

function completeSession(sessionId) {
  const db = getDB();
  const session = db.sessions.find(s => s.session_id === sessionId);
  if (session) {
    session.status = 'Completed';
    saveDB(db);
    showToast('Session marked as Completed! Redirecting to Feedback page...', 'success');
    setTimeout(() => window.location.href = 'feedback.html', 1000);
  }
}

/* 5. FEEDBACK PAGE */
function renderFeedbackPage() {
  const db = getDB();
  const completedSessions = db.sessions.filter(s => s.status === 'Completed');
  const container = document.getElementById('completedSessionsFeedbackList');
  if (!container) return;

  if (completedSessions.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; background: var(--surface); border-radius: var(--radius-xl); border: 1px dashed var(--border);">
        <i class="fa-regular fa-star" style="font-size: 2.5rem; color: var(--text-light); margin-bottom: 1rem;"></i>
        <h4 style="font-weight: 700;">No completed sessions requiring feedback</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Feedback can be provided once a mentorship session is completed.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = completedSessions.map(s => {
    const existingFeedback = db.feedback.find(f => f.session_id === s.session_id);
    return `
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header-flex">
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 800;">Session with ${s.mentor_name}</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem;">Date: ${s.session_date} | Field: ${s.field_name}</p>
          </div>
          <span class="badge badge-completed">Completed</span>
        </div>

        ${existingFeedback ? `
          <div style="background: var(--primary-light); border: 1px solid var(--primary-border); padding: 1rem 1.25rem; border-radius: var(--radius-md);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="font-weight: 700; color: var(--primary);">Your Submitted Rating:</span>
              <div style="color: #f59e0b;">
                ${'<i class="fa-solid fa-star"></i>'.repeat(existingFeedback.rating)}
              </div>
            </div>
            <p style="font-size: 0.9rem; color: var(--text-main); font-style: italic;">"${existingFeedback.review_text}"</p>
          </div>
        ` : `
          <form onsubmit="handleFeedbackSubmit(event, ${s.session_id}, '${s.mentor_name}')">
            <div class="form-group">
              <label class="form-label">Select Star Rating (1 to 5):</label>
              <div class="star-rating-input" data-rating-container="${s.session_id}">
                <i class="fa-solid fa-star" onclick="setStarRating(${s.session_id}, 1)"></i>
                <i class="fa-solid fa-star" onclick="setStarRating(${s.session_id}, 2)"></i>
                <i class="fa-solid fa-star" onclick="setStarRating(${s.session_id}, 3)"></i>
                <i class="fa-solid fa-star" onclick="setStarRating(${s.session_id}, 4)"></i>
                <i class="fa-solid fa-star" onclick="setStarRating(${s.session_id}, 5)"></i>
              </div>
              <input type="hidden" id="ratingVal_${s.session_id}" value="5" />
            </div>
            <div class="form-group">
              <label class="form-label">Write your feedback / review:</label>
              <textarea id="reviewText_${s.session_id}" class="form-control" placeholder="Describe your experience during this mentorship session..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-sm">
              <i class="fa-solid fa-paper-plane"></i> Submit Feedback
            </button>
          </form>
        `}
      </div>
    `;
  }).join('');

  // Default star highlight
  completedSessions.forEach(s => setStarRating(s.session_id, 5));
}

function setStarRating(sessionId, ratingVal) {
  const ratingInput = document.getElementById(`ratingVal_${sessionId}`);
  if (ratingInput) ratingInput.value = ratingVal;

  const container = document.querySelector(`[data-rating-container="${sessionId}"]`);
  if (!container) return;
  const stars = container.querySelectorAll('i');
  stars.forEach((star, idx) => {
    if (idx < ratingVal) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

function handleFeedbackSubmit(event, sessionId, mentorName) {
  event.preventDefault();
  const db = getDB();
  const currentUser = getCurrentUser();

  const ratingVal = parseInt(document.getElementById(`ratingVal_${sessionId}`).value);
  const reviewText = document.getElementById(`reviewText_${sessionId}`).value;

  const newFeedback = {
    feedback_id: Date.now(),
    session_id: sessionId,
    mentor_name: mentorName,
    student_name: currentUser.name,
    rating: ratingVal,
    review_text: reviewText,
    created_at: new Date().toISOString().split('T')[0]
  };

  db.feedback.push(newFeedback);
  saveDB(db);

  showToast('Feedback submitted successfully!', 'success');
  renderFeedbackPage();
}

/* 6. ALUMNI DASHBOARD */
function switchAlumniAccount(alumniId) {
  const db = getDB();
  const alumni = db.alumni.find(a => String(a.alumni_id) === String(alumniId));
  if (!alumni) return;

  setCurrentUserRole('alumni', alumni.alumni_id, alumni.name, alumni.email);
  showToast(`Switched active view to Alumni Mentor: ${alumni.name}`, 'info');

  initGlobalUI();
  initPageSpecificLogic();
}

function handleRequestStatus(requestId, newStatus) {
  const db = getDB();
  const req = db.mentorship_requests.find(r => r.request_id === requestId);
  if (!req) return;

  req.status = newStatus;

  if (newStatus === 'Accepted') {
    // Automatically add a scheduled session if not existing
    let existingSession = db.sessions.find(s => s.request_id === requestId);
    if (!existingSession) {
      const newSession = {
        session_id: Date.now(),
        request_id: requestId,
        student_id: req.student_id || 101,
        student_name: req.student_name,
        alumni_id: req.mentor_id,
        mentor_name: req.mentor_name,
        field_name: `${req.field_name} Mentorship`,
        session_date: '2026-10-14',
        start_time: '17:00',
        end_time: '17:30',
        status: 'Scheduled'
      };
      db.sessions.unshift(newSession);
    }
    showToast(`Request from ${req.student_name} accepted! Session scheduled for 14 Oct 2026 at 05:00 PM.`, 'success');
  } else {
    showToast(`Request from ${req.student_name} declined.`, 'info');
  }

  saveDB(db);
  initPageSpecificLogic();
}

/* 7. ALUMNI SESSIONS PAGE */
function renderAlumniSessionsPage() {
  const db = getDB();
  const currentUser = getCurrentUser();

  const currentAlumni = db.alumni.find(a => String(a.alumni_id) === String(currentUser.id)) ||
                        db.alumni.find(a => a.email.toLowerCase().trim() === currentUser.email.toLowerCase().trim()) ||
                        db.alumni.find(a => a.name.toLowerCase().trim() === currentUser.name.toLowerCase().trim()) ||
                        db.alumni[0];

  // Populate Header Account Switcher Dropdown if present
  const alumniSelectEl = document.getElementById('switchAlumniAccountSelect');
  if (alumniSelectEl) {
    alumniSelectEl.innerHTML = db.alumni.map(a => `
      <option value="${a.alumni_id}" ${String(a.alumni_id) === String(currentAlumni.alumni_id) ? 'selected' : ''}>
        ${a.name} (${a.job_title ? a.job_title.split('@')[0].trim() : 'Alumni'})
      </option>
    `).join('');
  }

  const greetingEl = document.getElementById('alumniSessionsGreeting');
  if (greetingEl) greetingEl.textContent = `${currentAlumni.name}'s Sessions Schedule`;

  const subheaderEl = document.getElementById('alumniSessionsSubheader');
  if (subheaderEl) subheaderEl.textContent = `Upcoming scheduled calls for ${currentAlumni.job_title}`;

  const sessions = db.sessions.filter(s => 
    String(s.alumni_id) === String(currentAlumni.alumni_id) ||
    (s.mentor_name && s.mentor_name.toLowerCase().trim() === currentAlumni.name.toLowerCase().trim())
  );

  const tbody = document.getElementById('alumniSessionsTableBody');
  if (!tbody) return;

  if (sessions.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2.5rem; color: var(--text-muted);"><i class="fa-regular fa-calendar-xmark" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i> No upcoming scheduled sessions for ${currentAlumni.name}.</td></tr>`;
    return;
  }

  tbody.innerHTML = sessions.map(s => `
    <tr>
      <td><strong>${s.student_name}</strong></td>
      <td><span class="mentor-field-tag">${s.field_name}</span></td>
      <td>${s.session_date}</td>
      <td>${s.start_time} - ${s.end_time}</td>
      <td>30 Mins</td>
      <td><span class="badge badge-${(s.status || 'Scheduled').toLowerCase()}">${s.status || 'Scheduled'}</span></td>
    </tr>
  `).join('');
}

function renderAlumniDashboard() {
  const db = getDB();
  const currentUser = getCurrentUser();

  // Find active alumni matching logged in user ID, name, or email
  const currentAlumni = db.alumni.find(a => String(a.alumni_id) === String(currentUser.id)) ||
                        db.alumni.find(a => a.email.toLowerCase().trim() === currentUser.email.toLowerCase().trim()) ||
                        db.alumni.find(a => a.name.toLowerCase().trim() === currentUser.name.toLowerCase().trim()) ||
                        db.alumni[0];

  // Sync currentUser in localStorage to match the selected alumni
  if (currentUser.role === 'alumni' && currentUser.id !== currentAlumni.alumni_id) {
    db.currentUser = {
      role: 'alumni',
      id: currentAlumni.alumni_id,
      name: currentAlumni.name,
      email: currentAlumni.email,
      job_title: currentAlumni.job_title || 'Alumni Mentor'
    };
    saveDB(db);
  }

  // Populate Header Account Switcher Dropdown if present
  const alumniSelectEl = document.getElementById('switchAlumniAccountSelect');
  if (alumniSelectEl) {
    alumniSelectEl.innerHTML = db.alumni.map(a => `
      <option value="${a.alumni_id}" ${String(a.alumni_id) === String(currentAlumni.alumni_id) ? 'selected' : ''}>
        ${a.name} (${a.job_title ? a.job_title.split('@')[0].trim() : 'Alumni'})
      </option>
    `).join('');
  }

  // Header & Stats
  const greetingEl = document.getElementById('alumniGreeting');
  if (greetingEl) greetingEl.textContent = `Welcome back, ${currentAlumni.name.split(' ')[0]} 👋`;

  const subheaderEl = document.getElementById('alumniSubheader');
  if (subheaderEl) subheaderEl.textContent = `${currentAlumni.job_title} • Mentorship Management`;

  let requestsForMe = db.mentorship_requests.filter(r => 
    String(r.mentor_id) === String(currentAlumni.alumni_id) || 
    (r.mentor_name && r.mentor_name.toLowerCase().trim() === currentAlumni.name.toLowerCase().trim())
  );
  
  // GUARANTEE: If no requests exist for this alumni mentor, auto-generate sample pending student requests!
  if (requestsForMe.length === 0) {
    const sampleReq1 = {
      request_id: Date.now(),
      student_id: 101,
      student_name: 'Priyanshi Sharma',
      field_id: currentAlumni.field_id || 1,
      field_name: currentAlumni.field_name || 'Database & Systems',
      message: `Hi ${currentAlumni.name.split(' ')[0]}, I am looking for 1-on-1 mentorship guidance regarding ${currentAlumni.field_name || 'technical topics'} and placement preparation strategies.`,
      mentor_id: currentAlumni.alumni_id,
      mentor_name: currentAlumni.name,
      status: 'Pending',
      created_at: new Date().toISOString().split('T')[0]
    };
    const sampleReq2 = {
      request_id: Date.now() + 1,
      student_id: 102,
      student_name: 'Rohan Patel',
      field_id: currentAlumni.field_id || 1,
      field_name: currentAlumni.field_name || 'Database & Systems',
      message: `Would love to get code review and architecture advice for my project from an experienced professional at ${currentAlumni.job_title ? (currentAlumni.job_title.split('@')[1] || 'industry') : 'industry'}.`,
      mentor_id: currentAlumni.alumni_id,
      mentor_name: currentAlumni.name,
      status: 'Pending',
      created_at: new Date().toISOString().split('T')[0]
    };
    db.mentorship_requests.unshift(sampleReq1, sampleReq2);
    saveDB(db);
    requestsForMe = [sampleReq1, sampleReq2];
  }

  const pendingReqs = requestsForMe.filter(r => (r.status || 'Pending') === 'Pending');
  const sessionsHosted = db.sessions.filter(s => 
    String(s.alumni_id) === String(currentAlumni.alumni_id) || 
    (s.mentor_name && s.mentor_name.toLowerCase().trim() === currentAlumni.name.toLowerCase().trim())
  );

  const newReqCountEl = document.getElementById('statNewRequestsCount');
  const sessionsHostedEl = document.getElementById('statSessionsHostedCount');
  const avgRatingEl = document.getElementById('statAvgRating');

  if (newReqCountEl) newReqCountEl.textContent = pendingReqs.length;
  if (sessionsHostedEl) sessionsHostedEl.textContent = sessionsHosted.length;
  if (avgRatingEl) avgRatingEl.textContent = `${currentAlumni.rating ? currentAlumni.rating.toFixed(1) : '5.0'} ★`;

  // Toggle Switch
  const toggle = document.getElementById('availabilityToggle');
  const toggleLabel = document.getElementById('availabilityStatusLabel');
  if (toggle) {
    toggle.checked = currentAlumni.is_active;
    if (toggleLabel) {
      toggleLabel.textContent = currentAlumni.is_active ? 'ACTIVE' : 'INACTIVE';
      toggleLabel.style.color = currentAlumni.is_active ? 'var(--success)' : 'var(--text-muted)';
    }

    toggle.onchange = (e) => {
      currentAlumni.is_active = e.target.checked;
      saveDB(db);
      if (toggleLabel) {
        toggleLabel.textContent = currentAlumni.is_active ? 'ACTIVE' : 'INACTIVE';
        toggleLabel.style.color = currentAlumni.is_active ? 'var(--success)' : 'var(--text-muted)';
      }
      showToast(`Availability updated to ${currentAlumni.is_active ? 'ACTIVE' : 'INACTIVE'}`, 'info');
    };
  }

  // Render Requests list
  const container = document.getElementById('alumniRequestsList');
  if (!container) return;

  if (requestsForMe.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; background: var(--surface); border-radius: var(--radius-xl); border: 1px dashed var(--border);">
        <i class="fa-solid fa-inbox" style="font-size: 2.5rem; color: var(--text-light); margin-bottom: 1rem;"></i>
        <h4 style="font-weight: 700;">No requests received yet</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem;">When students submit mentorship requests to you, they will appear here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = requestsForMe.map(r => {
    const reqStatus = r.status || 'Pending';
    return `
      <div class="card" style="margin-bottom: 1.25rem;">
        <div class="card-header-flex">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
              <strong style="font-size: 1.05rem;">${r.student_name}</strong>
              <span class="mentor-field-tag">${r.field_name}</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted);">Submitted Date: ${r.created_at}</p>
          </div>
          <span class="badge badge-${reqStatus.toLowerCase()}">${reqStatus}</span>
        </div>
        <p style="background: var(--surface-secondary); padding: 0.85rem 1rem; border-radius: var(--radius-md); font-size: 0.9rem; margin-bottom: 1rem;">
          "${r.message}"
        </p>
        ${reqStatus === 'Pending' ? `
          <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
            <button class="btn btn-danger btn-sm" onclick="handleRequestStatus(${r.request_id}, 'Declined')">
              <i class="fa-solid fa-xmark"></i> Decline
            </button>
            <button class="btn btn-success btn-sm" onclick="handleRequestStatus(${r.request_id}, 'Accepted')">
              <i class="fa-solid fa-check"></i> Accept Request
            </button>
          </div>
        ` : reqStatus === 'Accepted' ? `
          <div style="display: flex; align-items: center; justify-content: space-between; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 0.65rem 1rem; border-radius: var(--radius-md);">
            <span style="font-size: 0.85rem; color: #166534; font-weight: 700;">
              <i class="fa-solid fa-circle-check" style="color: var(--success); margin-right: 0.35rem;"></i> Request Accepted! Mentorship Call Scheduled.
            </span>
            <a href="alumni-sessions.html" class="btn btn-outline-primary btn-sm">
              <i class="fa-solid fa-calendar-check"></i> View in My Sessions →
            </a>
          </div>
        ` : `
        `}
      </div>
    `;
  }).join('');

  // Render Feedback & Reviews list for current alumni
  const feedbackContainer = document.getElementById('alumniFeedbackList');
  if (feedbackContainer) {
    const reviewsForMe = db.feedback.filter(f => 
      f.mentor_name && f.mentor_name.toLowerCase().trim() === currentAlumni.name.toLowerCase().trim()
    );

    if (reviewsForMe.length === 0) {
      feedbackContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem; background: var(--surface); border-radius: var(--radius-md); border: 1px dashed var(--border);">
          <i class="fa-regular fa-star" style="font-size: 2rem; color: var(--text-light); margin-bottom: 0.5rem; display: block;"></i>
          <p style="color: var(--text-muted); font-size: 0.875rem;">No reviews received yet for ${currentAlumni.name}.</p>
        </div>
      `;
    } else {
      feedbackContainer.innerHTML = reviewsForMe.map(f => `
        <div style="background: var(--primary-light); border: 1px solid var(--primary-border); padding: 1rem 1.25rem; border-radius: var(--radius-md); margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
            <div>
              <strong style="font-size: 0.95rem; color: var(--text-main);">${f.student_name}</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 0.5rem;">• Date: ${f.created_at}</span>
            </div>
            <div style="color: #f59e0b; font-size: 0.9rem;">
              ${'<i class="fa-solid fa-star"></i>'.repeat(f.rating || 5)}
              <span style="font-weight: 700; color: var(--text-main); margin-left: 0.25rem;">(${f.rating || 5}.0)</span>
            </div>
          </div>
          <p style="font-size: 0.875rem; color: var(--text-main); font-style: italic; margin: 0;">
            "${f.review_text}"
          </p>
        </div>
      `).join('');
    }
  }
}

function handleRequestStatus(requestId, newStatus) {
  const db = getDB();
  const req = db.mentorship_requests.find(r => r.request_id === requestId);
  if (!req) return;

  req.status = newStatus;

  if (newStatus === 'Accepted') {
    // Automatically add a scheduled session as demo helper
    const newSession = {
      session_id: Date.now(),
      request_id: requestId,
      student_name: req.student_name,
      alumni_id: req.mentor_id,
      mentor_name: req.mentor_name,
      field_name: `${req.field_name} Mentorship`,
      session_date: '2026-10-14',
      start_time: '17:00',
      end_time: '17:30',
      status: 'Scheduled'
    };
    db.sessions.push(newSession);
    showToast(`Request from ${req.student_name} accepted! Session auto-scheduled for 14 Oct 2026.`, 'success');
  } else {
    showToast(`Request from ${req.student_name} declined.`, 'info');
  }

  saveDB(db);
  renderAlumniDashboard();
}

/* 7. ALUMNI SESSIONS PAGE */
function renderAlumniSessionsPage() {
  const db = getDB();
  const currentAlumniId = 201;
  const sessions = db.sessions.filter(s => s.alumni_id === currentAlumniId);

  const tbody = document.getElementById('alumniSessionsTableBody');
  if (!tbody) return;

  if (sessions.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">No upcoming sessions found.</td></tr>`;
    return;
  }

  tbody.innerHTML = sessions.map(s => `
    <tr>
      <td><strong>${s.student_name}</strong></td>
      <td><span class="mentor-field-tag">${s.field_name}</span></td>
      <td>${s.session_date}</td>
      <td>${s.start_time} - ${s.end_time}</td>
      <td>30 Mins</td>
      <td><span class="badge badge-${s.status.toLowerCase()}">${s.status}</span></td>
    </tr>
  `).join('');
}

/* 8. PROFILE PAGE */
function renderProfilePage() {
  const currentUser = getCurrentUser();
  const db = getDB();

  document.getElementById('profileName').textContent = currentUser.name;
  document.getElementById('profileEmail').textContent = currentUser.email;
  document.getElementById('profileRoleBadge').textContent = currentUser.role.toUpperCase();

  const extraDetails = document.getElementById('profileExtraDetails');
  if (extraDetails) {
    if (currentUser.role === 'student') {
      extraDetails.innerHTML = `
        <div class="form-group">
          <label class="form-label">Graduation Year</label>
          <input type="text" class="form-control" value="${currentUser.gradYear || 2026}" readonly />
        </div>
        <div class="form-group">
          <label class="form-label">Branch / Field of Interest</label>
          <input type="text" class="form-control" value="Computer Science & Engineering" readonly />
        </div>
      `;
    } else {
      const alumniObj = db.alumni.find(a => a.alumni_id === currentUser.id) || db.alumni[0];
      extraDetails.innerHTML = `
        <div class="form-group">
          <label class="form-label">Job Title & Company</label>
          <input type="text" class="form-control" value="${alumniObj.job_title}" readonly />
        </div>
        <div class="form-group">
          <label class="form-label">Specialized Field</label>
          <input type="text" class="form-control" value="${alumniObj.field_name}" readonly />
        </div>
        <div class="form-group">
          <label class="form-label">Average Mentorship Rating</label>
          <input type="text" class="form-control" value="${alumniObj.rating} ★ (${alumniObj.num_reviews} Reviews)" readonly />
        </div>
      `;
    }
  }
}


