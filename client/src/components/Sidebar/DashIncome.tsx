import React, { useState, useEffect } from 'react';
import DashIncomeTable from './DashComponents/DashIncomeTable';
import DashIncomeForm from './DashComponents/DashIncomeForm';

export default function DashIncome() {
  ///////////
  // States
  //////////
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [userIncomes, setUserIncomes] = useState<any[]>([]);
  const [showMore, setShowMore] = useState(true);
  ///////////
  // Handlers and functions
  //////////
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/transactions/add-income', {
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
        fetchIncomes();
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  const fetchIncomes = async () => {
    try {
      const res = await fetch('/api/transactions/get-income');
      const data = await res.json();
      if (res.ok) {
        setUserIncomes(data.incomes);
        if (data.incomes.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleShowMore = async () => {
    const startIndex = userIncomes.length;
    try {
      const res = await fetch(
        `/api/transactions/get-income?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserIncomes((prev) => [...prev, ...data.incomes]);
        if (data.incomes.length < 9) {
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
    fetchIncomes();
  }, []);

  return (
    <div className="flex flex-col grow p-10 2xl:flex-row gap-10">
      {/* Left side */}
      <div className="basis-1/6">
        <DashIncomeForm
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          loading={loading}
          errorMessage={errorMessage}
        />
      </div>
      {/* Right side */}
      <DashIncomeTable
        userIncomes={userIncomes}
        showMore={showMore}
        handleShowMore={handleShowMore}
      />
    </div>
  );
}
