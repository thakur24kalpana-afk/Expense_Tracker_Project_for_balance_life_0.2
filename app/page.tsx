"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [expenses, setExpenses] = useState<
    { amount: string; desc: string }[]
  >([]);

  const addExpense = () => {
    if (!amount || !desc) return;

    setExpenses([...expenses, { amount, desc }]);
    setAmount("");
    setDesc("");
  };

  return (
    <div className="p-6">
      <Card className="max-w-md mx-auto p-4">
        <CardContent>
          <h1 className="text-xl font-bold mb-4">Finance Tracker</h1>

          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />

          <input
            type="text"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />

          <button
            onClick={addExpense}
            className="bg-blue-500 text-white px-4 py-2 w-full rounded"
          >
            Add Expense
          </button>
        </CardContent>
      </Card>

      <div className="max-w-md mx-auto mt-4">
        {expenses.map((item, index) => (
          <div key={index} className="border p-2 mb-2 rounded">
            ₹{item.amount} - {item.desc}
          </div>
        ))}
      </div>
    </div>
  );
}