import React, { useState, useEffect } from 'react';
import DashExpenseTable from './DashComponents/DashExpenseTable';
import DashExpenseForm from './DashComponents/DashExpenseForm';

export default function DashExpense() {
  ///////////
  // States
  //////////
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [userExpenses, setUserExpenses] = useState<any[]>([]);
  const [showMore, setShowMore] = useState(true);
  ///////////
  // Handlers and functions
  //////////
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/transactions/add-expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        setErrorMessage(data.message);
        return;
      }

      if (res.ok) {
        setErrorMessage(null);
        //Empty the form
        setFormData({});
        //Refresh the data
        fetchExpenses();
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await fetch('/api/transactions/get-expense');
      const data = await res.json();
      if (res.ok) {
        setUserExpenses(data.expenses);
        if (data.expenses.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleShowMore = async () => {
    const startIndex = userExpenses.length;
    try {
      const res = await fetch(
        `/api/transactions/get-expense?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserExpenses((prev) => [...prev, ...data.expenses]);
        if (data.expenses.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  ///////////
  // useEffect
  //////////

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="flex flex-col grow p-10 2xl:flex-row gap-10">
      {/* Left side */}
      <div className="basis-1/6">
        <DashExpenseForm
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          loading={loading}
          errorMessage={errorMessage}
        />
      </div>
      {/* Right side */}
      <DashExpenseTable
        userExpenses={userExpenses}
        showMore={showMore}
        handleShowMore={handleShowMore}
      />
    </div>
  );
}
