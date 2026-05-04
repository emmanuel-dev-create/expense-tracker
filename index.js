const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const expenseList = document.getElementById('expenseList');
const spentAmountDisplay = document.getElementById('spentAmountDisplay');

let expenses = JSON.parse(localStorage.getItem('myExpenses')) || [];

expenseForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    const newExpense = {
        id: Date.now(),
        description: descriptionInput.value,
        amount: Number(amountInput.value),
        category: categoryInput.value
    }

    expenses.push(newExpense);
    saveToLocal();
    renderExpenses();
    expenseForm.reset();
});

// DISPLAY EXPENSES
function renderExpenses() {
    expenseList.innerHTML = '';

    expenses.forEach(function(item) {
        const expenseDiv = document.createElement('div');
        
        expenseDiv.classList.add('expense-item');

        expenseDiv.innerHTML = `
            <span>${item.description} (${item.category})</span>
            <div>
                <strong>${item.amount} KES</strong>
                <button onclick="deleteExpense(${item.id})" style="margin-left: 10px; color: red; cursor: pointer;">Delete</button>
            </div>
        `;

        expenseList.appendChild(expenseDiv);
    });
    updateTotal()
}

// TOTAL SPENT
function updateTotal(){
    const totalAmount = expenses.reduce((acc, item) =>{
        return item.amount + acc;
    },0);

    spentAmountDisplay.textContent = `Spent: ${totalAmount} KES`
};

// SAVE TO LOCAL STORAGE
function saveToLocal(){
    localStorage.setItem('myExpenses', JSON.stringify(expenses))
}
function deleteExpense(idToDelete){
    expenses = expenses.filter(item => item.id !== idToDelete);
    saveToLocal()
    renderExpenses()
}

renderExpenses()
