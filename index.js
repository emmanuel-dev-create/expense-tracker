const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const expenseList = document.getElementById('expenseList');
const spentAmountDisplay = document.getElementById('spentAmountDisplay');

let expenses = [];

expenseForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    const newExpense = {
        id: Date.now(), // Unique ID using the current time in milliseconds
        description: descriptionInput.value,
        amount: Number(amountInput.value), // Convert the text "50" to the number 50
        category: categoryInput.value
    }

    expenses.push(newExpense);
    // console.log("Updated Expense List:", expenses);
    renderExpenses()
    expenseForm.reset();
})
function renderExpenses() {
    // 1. Clear the list first so we don't show duplicates
    expenseList.innerHTML = '';

    // 2. Loop through every item in our 'expenses' array
    expenses.forEach(function(item) {
        // Create a new div for this expense
        const expenseDiv = document.createElement('div');
        
        // Give it the 'expense-item' class we styled in CSS
        expenseDiv.classList.add('expense-item');

        // Put the information inside the div
        expenseDiv.innerHTML = `
            <span>${item.description} (${item.category})</span>
            <strong>${item.amount} KES</strong>
        `;

        // Add this new div to the actual page
        expenseList.appendChild(expenseDiv);
    });
}