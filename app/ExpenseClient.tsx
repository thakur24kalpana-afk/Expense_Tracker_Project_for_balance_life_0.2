"use client";

import { useEffect, useState } from "react";

type Expense = {
  id: number;
  amount: number;
  description: string;
};

export default function ExpenseClient() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // 🔥 FETCH EXPENSES
  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/expenses");
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // 🔥 ADD EXPENSE
  const handleAdd = async () => {
    console.log("CLICKED 🔥");

    if (!amount || !description) {
      alert("Enter amount & description");
      return;
    }

    await fetch("http://localhost:3000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(amount),
        description: description,
      }),
    });

    setAmount("");
    setDescription("");

    fetchExpenses();
  };

  // 🔥 DELETE EXPENSE
  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/api/expenses/${id}`, {
      method: "DELETE",
    });

    fetchExpenses();
  };

  // 🔥 TOTAL
  const total = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Finance Tracker</h2>

      {/* INPUTS */}
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      {/* 🔥 BUTTON FIXED */}
      <button
        onClick={handleAdd}
        style={{
          marginLeft: "10px",
          padding: "5px 10px",
          background: "blue",
          color: "white",
        }}
      >
        Add Expense
      </button>

      <h3>Total: ₹{total}</h3>

      {/* TABLE */}
      <table border={1} width="100%" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan={3}>No expenses yet</td>
            </tr>
          ) : (
            expenses.map((item) => (
              <tr key={item.id}>
                <td>{item.amount}</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}