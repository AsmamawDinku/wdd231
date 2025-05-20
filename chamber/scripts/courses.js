// Course data array (modify completed status as needed)
const courses = [
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, completed: true },
    { code: "WDD 230", name: "Web Frontend Development I", credits: 3, completed: true },
    { code: "WDD 231", name: "Web Frontend Development II", credits: 3, completed: false },
    { code: "CSE 111", name: "Programming With Functions", credits: 3, completed: false },
    // Add more courses as needed
];

// Display all courses by default
displayCourses(courses);

// Filter buttons functionality
document.getElementById('all').addEventListener('click', () => displayCourses(courses));
document.getElementById('wdd').addEventListener('click', () => displayCourses(courses.filter(course => course.code.includes('WDD'))));
document.getElementById('cse').addEventListener('click', () => displayCourses(courses.filter(course => course.code.includes('CSE'))));

function displayCourses(filteredCourses) {
    const courseContainer = document.getElementById('course-cards');
    courseContainer.innerHTML = '';

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p>Credits: ${course.credits}</p>
            ${course.completed ? '<p class="completed-text">✓ Completed</p>' : ''}
        `;
        courseContainer.appendChild(card);
    });

    // Update total credits
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('total-credits').textContent = totalCredits;
}