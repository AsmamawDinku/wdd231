// Form handling JavaScript
import { openModal, closeModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('accountApplication');
    const steps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const sameMailingCheckbox = document.getElementById('sameMailing');
    const mailingAddressSection = document.getElementById('mailingAddressSection');
    const employmentSelect = document.getElementById('employment');
    const employerGroup = document.getElementById('employerGroup');
    const termsModalBtn = document.getElementById('termsModalBtn');
    const termsModal = document.getElementById('termsModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const stateSelect = document.getElementById('state');
    const mailingStateSelect = document.getElementById('mailingState');
    const confirmationDetails = document.getElementById('confirmationDetails');

    // US states array
    const usStates = [
        { code: 'AL', name: 'Alabama' },
        { code: 'AK', name: 'Alaska' },
        { code: 'AZ', name: 'Arizona' },
        { code: 'AR', name: 'Arkansas' },
        { code: 'CA', name: 'California' },
        { code: 'CO', name: 'Colorado' },
        { code: 'CT', name: 'Connecticut' },
        { code: 'DE', name: 'Delaware' },
        { code: 'FL', name: 'Florida' },
        { code: 'GA', name: 'Georgia' },
        { code: 'HI', name: 'Hawaii' },
        { code: 'ID', name: 'Idaho' },
        { code: 'IL', name: 'Illinois' },
        { code: 'IN', name: 'Indiana' },
        { code: 'IA', name: 'Iowa' },
        { code: 'KS', name: 'Kansas' },
        { code: 'KY', name: 'Kentucky' },
        { code: 'LA', name: 'Louisiana' },
        { code: 'ME', name: 'Maine' },
        { code: 'MD', name: 'Maryland' },
        { code: 'MA', name: 'Massachusetts' },
        { code: 'MI', name: 'Michigan' },
        { code: 'MN', name: 'Minnesota' },
        { code: 'MS', name: 'Mississippi' },
        { code: 'MO', name: 'Missouri' },
        { code: 'MT', name: 'Montana' },
        { code: 'NE', name: 'Nebraska' },
        { code: 'NV', name: 'Nevada' },
        { code: 'NH', name: 'New Hampshire' },
        { code: 'NJ', name: 'New Jersey' },
        { code: 'NM', name: 'New Mexico' },
        { code: 'NY', name: 'New York' },
        { code: 'NC', name: 'North Carolina' },
        { code: 'ND', name: 'North Dakota' },
        { code: 'OH', name: 'Ohio' },
        { code: 'OK', name: 'Oklahoma' },
        { code: 'OR', name: 'Oregon' },
        { code: 'PA', name: 'Pennsylvania' },
        { code: 'RI', name: 'Rhode Island' },
        { code: 'SC', name: 'South Carolina' },
        { code: 'SD', name: 'South Dakota' },
        { code: 'TN', name: 'Tennessee' },
        { code: 'TX', name: 'Texas' },
        { code: 'UT', name: 'Utah' },
        { code: 'VT', name: 'Vermont' },
        { code: 'VA', name: 'Virginia' },
        { code: 'WA', name: 'Washington' },
        { code: 'WV', name: 'West Virginia' },
        { code: 'WI', name: 'Wisconsin' },
        { code: 'WY', name: 'Wyoming' }
    ];

    // Populate state dropdowns
    function populateStates(selectElement) {
        usStates.forEach(state => {
            const option = document.createElement('option');
            option.value = state.code;
            option.textContent = state.name;
            selectElement.appendChild(option);
        });
    }

    if (stateSelect) populateStates(stateSelect);
    if (mailingStateSelect) populateStates(mailingStateSelect);

    // Form navigation
    let currentStep = 0;

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        currentStep = stepIndex;
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Validate current step before proceeding
            const currentStepElement = steps[currentStep];
            const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });

            if (isValid) {
                if (currentStep === steps.length - 2) {
                    // On the last step before submit, update the review section
                    updateReviewSection();
                }
                showStep(currentStep + 1);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            showStep(currentStep - 1);
        });
    });

    // Toggle mailing address section
    if (sameMailingCheckbox && mailingAddressSection) {
        sameMailingCheckbox.addEventListener('change', () => {
            mailingAddressSection.style.display = sameMailingCheckbox.checked ? 'none' : 'block';
        });
    }

    // Toggle employer field based on employment status
    if (employmentSelect && employerGroup) {
        employmentSelect.addEventListener('change', () => {
            employerGroup.style.display = 
                (employmentSelect.value === 'employed' || employmentSelect.value === 'self_employed') 
                ? 'block' : 'none';
        });
    }

    // Modal for terms and conditions
    if (termsModalBtn && termsModal) {
        termsModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(termsModal);
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            closeModal(termsModal);
        });
    }

    // Update review section before submission
    function updateReviewSection() {
        const reviewPersonal = document.getElementById('reviewPersonal');
        const reviewAddress = document.getElementById('reviewAddress');
        const reviewFinancial = document.getElementById('reviewFinancial');

        // Personal Information
        const personalData = {
            'Account Type': document.getElementById('accountType').options[document.getElementById('accountType').selectedIndex].text,
            'First Name': document.getElementById('firstName').value,
            'Last Name': document.getElementById('lastName').value,
            'Email': document.getElementById('email').value,
            'Phone': document.getElementById('phone').value,
            'Date of Birth': document.getElementById('dob').value,
            'SSN': document.getElementById('ssn').value
        };

        reviewPersonal.innerHTML = Object.entries(personalData).map(([key, value]) => `
            <div class="review-item"><strong>${key}:</strong> ${value}</div>
        `).join('');

        // Address Information
        const addressData = {
            'Street': document.getElementById('street').value,
            'City': document.getElementById('city').value,
            'State': document.getElementById('state').options[document.getElementById('state').selectedIndex].text,
            'ZIP Code': document.getElementById('zip').value,
            'Mailing Address Same': sameMailingCheckbox.checked ? 'Yes' : 'No'
        };

        if (!sameMailingCheckbox.checked) {
            addressData['Mailing Street'] = document.getElementById('mailingStreet').value;
            addressData['Mailing City'] = document.getElementById('mailingCity').value;
            addressData['Mailing State'] = document.getElementById('mailingState').options[document.getElementById('mailingState').selectedIndex].text;
            addressData['Mailing ZIP'] = document.getElementById('mailingZip').value;
        }

        reviewAddress.innerHTML = Object.entries(addressData).map(([key, value]) => `
            <div class="review-item"><strong>${key}:</strong> ${value}</div>
        `).join('');

        // Financial Information
        const financialData = {
            'Employment Status': document.getElementById('employment').options[document.getElementById('employment').selectedIndex].text,
            'Employer': document.getElementById('employer').value || 'N/A',
            'Annual Income': document.getElementById('income').options[document.getElementById('income').selectedIndex].text,
            'Initial Deposit': `$${document.getElementById('initialDeposit').value}`,
            'Funding Method': document.getElementById('funding').options[document.getElementById('funding').selectedIndex].text
        };

        reviewFinancial.innerHTML = Object.entries(financialData).map(([key, value]) => `
            <div class="review-item"><strong>${key}:</strong> ${value}</div>
        `).join('');
    }

    // Display confirmation details on thank you page
    if (confirmationDetails) {
        const urlParams = new URLSearchParams(window.location.search);
        const confirmationData = {
            'Application ID': `BOA-${Math.floor(100000 + Math.random() * 900000)}`,
            'Account Type': urlParams.get('accountType') ? 
                document.getElementById('accountType').options[document.getElementById('accountType').selectedIndex].text : 'Advantage Plus Banking',
            'Name': `${urlParams.get('firstName') || 'John'} ${urlParams.get('lastName') || 'Doe'}`,
            'Email': urlParams.get('email') || 'johndoe@example.com',
            'Status': 'Pending Review'
        };

        confirmationDetails.innerHTML = Object.entries(confirmationData).map(([key, value]) => `
            <div class="confirmation-item"><strong>${key}:</strong> ${value}</div>
        `).join('');
    }

    // Input validation
    const ssnInput = document.getElementById('ssn');
    if (ssnInput) {
        ssnInput.addEventListener('input', (e) => {
            const value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                formattedValue = value.substring(0, 3);
                if (value.length > 3) {
                    formattedValue += '-' + value.substring(3, 5);
                    if (value.length > 5) {
                        formattedValue += '-' + value.substring(5, 9);
                    }
                }
            }
            
            e.target.value = formattedValue;
        });
    }

    const zipInput = document.getElementById('zip');
    if (zipInput) {
        zipInput.addEventListener('input', (e) => {
            const value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                formattedValue = value.substring(0, 5);
                if (value.length > 5) {
                    formattedValue += '-' + value.substring(5, 9);
                }
            }
            
            e.target.value = formattedValue;
        });
    }

    // Store form data in localStorage as user progresses
    if (form) {
        form.addEventListener('input', (e) => {
            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            localStorage.setItem('bankApplicationForm', JSON.stringify(formObject));
        });

        // Load saved form data if available
        const savedFormData = localStorage.getItem('bankApplicationForm');
        if (savedFormData) {
            const formObject = JSON.parse(savedFormData);
            Object.keys(formObject).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                    if (input.type === 'checkbox') {
                        input.checked = formObject[key] === 'on';
                    } else {
                        input.value = formObject[key];
                    }
                }
            });

            // Trigger change events for dependent fields
            if (sameMailingCheckbox) sameMailingCheckbox.dispatchEvent(new Event('change'));
            if (employmentSelect) employmentSelect.dispatchEvent(new Event('change'));
        }
    }
});