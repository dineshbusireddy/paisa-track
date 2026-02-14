{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const KEY = "paisa_expenses";\
\
function getExpenses() \{\
  return JSON.parse(localStorage.getItem(KEY) || "[]");\
\}\
\
function saveExpenses(expenses) \{\
  localStorage.setItem(KEY, JSON.stringify(expenses));\
\}\
\
function addExpense() \{\
  const amount = document.getElementById("amount").value;\
  const category = document.getElementById("category").value;\
\
  if (!amount || !category) return alert("Enter amount and category");\
\
  const expenses = getExpenses();\
  expenses.push(\{\
    amount: Number(amount),\
    category,\
    date: new Date().toISOString().slice(0, 10),\
  \});\
\
  saveExpenses(expenses);\
  renderExpenses();\
\}\
\
function renderExpenses() \{\
  const list = document.getElementById("expenseList");\
  list.innerHTML = "";\
\
  getExpenses().forEach((e) => \{\
    const li = document.createElement("li");\
    li.textContent = `\uc0\u8377 $\{e.amount\} - $\{e.category\} ($\{e.date\})`;\
    list.appendChild(li);\
  \});\
\}\
\
renderExpenses();\
}