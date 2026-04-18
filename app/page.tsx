"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState<any[]>([]);

  const getExpenses = async () => {
    const res = await fetch("/api/expenses");
    const data = await res.json();
    setExpenses(data);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const addExpense = async () => {
    await fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify({
        amount,
        description,
      }),
    });

    setAmount("");
    setDescription("");
    getExpenses();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f6fa",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "600px",
        margin: "auto",
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ textAlign: "center" }}>💰 Finance Tracker</h1>

        <h2 style={{ textAlign: "center", color: "green" }}>
          Total: ₹{expenses.reduce((sum, e) => sum + e.amount, 0)}
        </h2>

        {/* Input */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              flex: 2,
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />

          <button
            onClick={addExpense}
            style={{
              background: "#0070f3",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Add
          </button>
        </div>

        {/* List */}
        {expenses.length === 0 ? (
          <p style={{ textAlign: "center" }}>No expenses yet</p>
        ) : (
          <div>
            {expenses.map((e) => (
              <div key={e.id} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #eee"
              }}>
                <span>₹{e.amount}</span>
                <span>{e.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}