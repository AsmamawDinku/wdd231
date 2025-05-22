// Modal and testimonial functionality
export function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

export function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

export async function loadTestimonials() { // load testimonals from the api and display them
    try {
        const response = await fetch('https://api.npoint.io/3d8f1b3a3a3a3a3a3a3a'); // Example API endpoint for testimonials
        if (!response.ok) { // Check if the response is ok
            throw new Error('Failed to fetch testimonials'); // If not, throw an error
        }
        const testimonials = await response.json(); // Parse the JSON response
        displayTestimonials(testimonials); // Call the function to display testimonials
    } catch (error) { // Handle errors
        console.error('Error loading testimonials:', error); // Log the error
        // Fallback testimonials
        const fallbackTestimonials = [ // Fallback testimonials in case of an error
            {
                text: "Bank of Asmamaw has been a great partner for my small business. Their online banking is easy to use and their customer service is excellent.",
                author: "Moroni",
                role: "Small Business Owner"
            },
            {
                text: "I've been a customer since they opened in 2025. The personal attention and great rates keep me coming back.",
                author: "Abel",
                role: "Long-time Customer"
            },
            {
                text: "Switching to Bank of Asmamaw was the best financial decision I made this year. The mobile app is fantastic!",
                author: "David Wilson",
                role: "New Customer"
            }

    
        ];
        displayTestimonials(fallbackTestimonials); // Display fallback testimonials 
    }
}

function displayTestimonials(testimonials) {
    const slider = document.getElementById('testimonialSlider');
    if (!slider) return;

    let currentIndex = 0;

    function showTestimonial(index) {
        slider.innerHTML = `
            <div class="testimonial-item">
                <p>"${testimonials[index].text}"</p>
                <div class="author">${testimonials[index].author} - ${testimonials[index].role}</div>
            </div>
        `;
    }

    // Show first testimonial
    showTestimonial(currentIndex);

    // Rotate testimonials every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}