const KEY = "paisa_expenses";

function getExpenses() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function saveExpenses(expenses) {
  localStorage.setItem(KEY, JSON.stringify(expenses));
}

function addExpense() {
  const amountInput = document.getElementById("amount");
  const categoryInput = document.getElementById("category");

  const amount = amountInput.value;
  const category = categoryInput.value;

  if (!amount || !category) {
    alert("Please enter amount and category");
    return;
  }

  const expenses = getExpenses();
  expenses.push({
    id: Date.now(),
    amount: Number(amount),
    category,
    date: new Date().toISOString().slice(0, 10),
  });

  saveExpenses(expenses);

  amountInput.value = "";
  categoryInput.value = "";

  renderExpenses();
}

function renderExpenses() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  const expenses = getExpenses();

  if (expenses.length === 0) {
    list.innerHTML = "<li>No expenses yet</li>";
    return;
  }

  expenses.forEach((e) => {
    const li = document.createElement("li");
    li.textContent = `₹${e.amount} - ${e.category} (${e.date})`;
    list.appendChild(li);
  });
}

document.getElementById("addBtn").addEventListener("click", addExpense);

renderExpenses();
