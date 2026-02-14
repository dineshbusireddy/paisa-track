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
  const categorySelect = document.getElementById("category");

  const amount = amountInput.value;
  const category = categorySelect.value;

  if (!amount || !category) {
    alert("Please enter amount and select category");
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
  categorySelect.value = "";

  renderExpenses();
}

function deleteExpense(id) {
  let expenses = getExpenses();
  expenses = expenses.filter(e => e.id !== id);
  saveExpenses(expenses);
  renderExpenses();
}

function renderExpenses() {
  const list = document.getElementById("expenseList");
  const totalSpan = document.getElementById("totalAmount");

  list.innerHTML = "";

  const expenses = getExpenses();
  let total = 0;

  if (expenses.length === 0) {
    list.innerHTML = "<li>No expenses yet</li>";
    totalSpan.textContent = "0";
    return;
  }

  expenses.forEach((e) => {
    total += e.amount;

    const li = document.createElement("li");
    li.className = "expense-row";

    const text = document.createElement("span");
    text.textContent = `₹${e.amount} - ${e.category}`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteExpense(e.id);

    li.appendChild(text);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  totalSpan.textContent = total.toString();
}

document.getElementById("addBtn").addEventListener("click", addExpense);

renderExpenses();
