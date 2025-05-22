// Accounts page JavaScript
import { openModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
    const accountContainer = document.getElementById('accountContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const compareTableBody = document.getElementById('compareTableBody');

    // Account data
    const accountData = [
        {
            id: 'advantage_plus',
            type: 'checking',
            name: 'Advantage Plus Banking',
            description: 'Our most popular checking account with flexible options',
            features: [
                'No monthly fee with qualifying activities',
                'Access to 500+ ATMs',
                'Mobile and online banking',
                'Overdraft protection options'
            ],
            minDeposit: '$25',
            monthlyFee: '$12 (waivable)',
            apy: '0.01%',
            atmAccess: 'Free at BOA ATMs'
        },
        {
            id: 'advantage_safe',
            type: 'checking',
            name: 'Advantage SafeBalance Banking',
            description: 'A checking account designed to help you avoid overdraft fees',
            features: [
                'No overdraft fees',
                'No monthly fee for eligible students',
                'Digital payments included',
                'Access to mobile banking'
            ],
            minDeposit: '$25',
            monthlyFee: '$4.95 (waivable)',
            apy: '0.01%',
            atmAccess: 'Free at BOA ATMs'
        },
        {
            id: 'advantage_relationship',
            type: 'checking',
            name: 'Advantage Relationship Banking',
            description: 'Premium checking with added benefits and rewards',
            features: [
                'No monthly fee with minimum balance',
                'No fees on non-BOA ATMs',
                'Higher interest rates',
                'Free checks and money orders'
            ],
            minDeposit: '$100',
            monthlyFee: '$25 (waivable)',
            apy: '0.03%',
            atmAccess: 'Free at all ATMs'
        },
        {
            id: 'advantage_savings',
            type: 'savings',
            name: 'Advantage Savings',
            description: 'Grow your savings with easy access to your money',
            features: [
                'No monthly fee with minimum balance',
                'Automatic savings plans',
                'Linked to checking for overdraft protection',
                'Online transfers'
            ],
            minDeposit: '$100',
            monthlyFee: '$8 (waivable)',
            apy: '0.05%',
            atmAccess: 'N/A'
        },
        {
            id: 'premium_savings',
            type: 'savings',
            name: 'Premium Savings',
            description: 'Higher yields for larger savings balances',
            features: [
                'Tiered interest rates',
                'No monthly fee with minimum balance',
                '24/7 account access',
                'FDIC insured'
            ],
            minDeposit: '$1,000',
            monthlyFee: '$10 (waivable)',
            apy: '0.10% - 0.50%',
            atmAccess: 'N/A'
        },
        {
            id: 'cd_3month',
            type: 'cd',
            name: '3-Month CD',
            description: 'Short-term certificate of deposit with guaranteed returns',
            features: [
                'Fixed interest rate',
                'FDIC insured',
                'Terms from 3 months to 5 years',
                'Minimum deposit required'
            ],
            minDeposit: '$1,000',
            monthlyFee: '$0',
            apy: '2.50%',
            atmAccess: 'N/A'
        },
        {
            id: 'cd_1year',
            type: 'cd',
            name: '1-Year CD',
            description: 'One-year certificate of deposit with competitive rates',
            features: [
                'Higher rates for longer terms',
                'Early withdrawal penalties apply',
                'Automatic renewal options',
                'FDIC insured'
            ],
            minDeposit: '$1,000',
            monthlyFee: '$0',
            apy: '3.25%',
            atmAccess: 'N/A'
        },
        {
            id: 'cd_5year',
            type: 'cd',
            name: '5-Year CD',
            description: 'Long-term certificate for maximum returns',
            features: [
                'Highest interest rates',
                'Fixed rate for full term',
                'Early withdrawal penalties apply',
                'Ideal for long-term savings'
            ],
            minDeposit: '$1,000',
            monthlyFee: '$0',
            apy: '4.00%',
            atmAccess: 'N/A'
        },
        {
            id: 'ira_traditional',
            type: 'ira',
            name: 'Traditional IRA',
            description: 'Retirement savings with tax-deferred growth',
            features: [
                'Tax-deductible contributions',
                'Tax-deferred growth',
                'Withdrawals taxed as income',
                'Required minimum distributions'
            ],
            minDeposit: '$500',
            monthlyFee: '$0',
            apy: 'Varies by investment',
            atmAccess: 'N/A'
        },
        {
            id: 'ira_roth',
            type: 'ira',
            name: 'Roth IRA',
            description: 'Retirement savings with tax-free withdrawals',
            features: [
                'After-tax contributions',
                'Tax-free growth and withdrawals',
                'No required minimum distributions',
                'Income limits apply'
            ],
            minDeposit: '$500',
            monthlyFee: '$0',
            apy: 'Varies by investment',
            atmAccess: 'N/A'
        },
        {
            id: 'ira_rollover',
            type: 'ira',
            name: 'Rollover IRA',
            description: 'Consolidate retirement accounts into one',
            features: [
                'Transfer 401(k) or other retirement accounts',
                'Continue tax-deferred growth',
                'Wide investment options',
                'No tax penalties'
            ],
            minDeposit: '$0',
            monthlyFee: '$0',
            apy: 'Varies by investment',
            atmAccess: 'N/A'
        },
        {
            id: 'student_checking',
            type: 'checking',
            name: 'Student Checking',
            description: 'Checking account designed for students',
            features: [
                'No monthly maintenance fee',
                'No minimum balance requirement',
                'Mobile banking with alerts',
                'Overdraft protection options'
            ],
            minDeposit: '$25',
            monthlyFee: '$0',
            apy: '0.01%',
            atmAccess: 'Free at BOA ATMs'
        },
        {
            id: 'senior_checking',
            type: 'checking',
            name: 'Senior Checking',
            description: 'Checking account for customers 55+',
            features: [
                'No monthly maintenance fee',
                'Free checks',
                'Discounts on other services',
                'Dedicated customer service'
            ],
            minDeposit: '$50',
            monthlyFee: '$0',
            apy: '0.02%',
            atmAccess: 'Free at BOA ATMs'
        },
        {
            id: 'business_checking',
            type: 'checking',
            name: 'Business Checking',
            description: 'Checking account for small businesses',
            features: [
                '200 free transactions per month',
                'Cash deposit allowance',
                'Online invoicing',
                'Business debit card'
            ],
            minDeposit: '$100',
            monthlyFee: '$15 (waivable)',
            apy: '0.01%',
            atmAccess: 'Free at BOA ATMs'
        },
        {
            id: 'money_market',
            type: 'savings',
            name: 'Money Market Account',
            description: 'Higher interest with check writing privileges',
            features: [
                'Tiered interest rates',
                'Limited check writing',
                'FDIC insured',
                'Online transfers'
            ],
            minDeposit: '$2,500',
            monthlyFee: '$12 (waivable)',
            apy: '0.25% - 1.00%',
            atmAccess: 'N/A'
        }
    ];

    // Display accounts
    function displayAccounts(filter = 'all') { 
        accountContainer.innerHTML = '';
        
        const filteredAccounts = filter === 'all' 
            ? accountData 
            : accountData.filter(account => account.type === filter);
        
        filteredAccounts.forEach(account => {
            const accountCard = document.createElement('div'); // Create a new div for each account 
            accountCard.className = 'account-card'; // Set the class name for styling
            accountCard.innerHTML = ` 
                <div class="account-card-header">
                    <h3>${account.name}</h3>
                    <p>${account.description}</p>
                </div>
                <div class="account-card-body">
                    ${account.features.map(feature => `
                        <div class="account-feature">
                            <span class="account-feature-icon">✓</span>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="account-card-footer">
                    <a href="apply.html?account=${account.id}" class="cta-button">Open Account</a>
                </div>
            `;
            accountContainer.appendChild(accountCard);
        });
    }

    // Filter accounts
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayAccounts(button.dataset.filter);
        });
    });

    // Display comparison table
    function displayComparisonTable() {
        compareTableBody.innerHTML = '';
        
        accountData.forEach(account => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${account.name}</td>
                <td>${account.minDeposit}</td>
                <td>${account.monthlyFee}</td>
                <td>${account.apy}</td>
                <td>${account.atmAccess}</td>
            `;
            compareTableBody.appendChild(row);
        });
    }

    // Initialize
    displayAccounts();
    displayComparisonTable();
});