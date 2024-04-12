import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Chart } from 'react-google-charts';

import {
  HiCurrencyEuro,
  HiArrowNarrowUp,
  HiArrowNarrowDown,
  HiOutlineInformationCircle,
} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashMain() {
  ////////
  // States
  ///////
  // Incomes
  const [userIncomes, setUserIncomes] = useState([]);
  const [userIncomesSum, setUserIncomesSum] = useState(0);
  const [userIncomeCount, setUserIncomesCount] = useState(0);
  const [userIncomesByCategory, setUserIncomesByCategory] = useState([]);
  // Expenses
  const [userExpenses, setUserExpenses] = useState([]);
  const [userExpensesSum, setUserExpensesSum] = useState(0);
  const [userExpensesCount, setUserExpensesCount] = useState(0);
  const [userExpensesByCategory, setUserExpensesByCategory] = useState([]);
  // Current user
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { theme } = useSelector((state: RootState) => state.theme);
  const [latestTransactions, setLatestTransactions] = useState([]);
  // Expenses state

  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
    console.log(userIncomes);
    console.log(userExpenses);
  }, [currentUser]);
  useEffect(() => {
    setIncomeCategory();
  }, [userIncomes]);

  useEffect(() => {
    setExpenseCategory();
  }, [userExpenses]);

  ////////
  // Functions
  ///////

  useEffect(() => {
    fetchLatestTransactions();
    console.log(latestTransactions);
  }, [currentUser]);

  const fetchLatestTransactions = async () => {
    try {
      const incomesRes = await fetch('/api/transactions/get-income?limit=1000');
      const expensesRes = await fetch(
        '/api/transactions/get-expense?limit=1000'
      );

      const incomesData = await incomesRes.json();
      const expensesData = await expensesRes.json();

      if (incomesRes.ok && expensesRes.ok) {
        const combinedTransactions = [
          ...incomesData.incomes.map((income) => ({
            ...income,
            type: 'income',
          })),
          ...expensesData.expenses.map((expense) => ({
            ...expense,
            type: 'expense',
          })),
        ];

        // Sort combinedTransactions by date in descending order
        combinedTransactions.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setLatestTransactions(combinedTransactions);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchIncomes = async () => {
    try {
      const res = await fetch('/api/transactions/get-income?limit=1000');
      const data = await res.json();
      if (res.ok) {
        setUserIncomes(data.incomes);
        setUserIncomesCount(data.totalIncomeCount);
        setUserIncomesSum(data.total);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await fetch('/api/transactions/get-expense?limit=1000');
      const data = await res.json();
      if (res.ok) {
        setUserExpenses(data.expenses);
        setUserExpensesCount(data.totalExpenseCount);
        setUserExpensesSum(data.total);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const setIncomeCategory = function () {
    const incomeArray: any = [];
    incomeArray.push(['Category', 'Amount']);
    userIncomes.forEach((item: any) => {
      incomeArray.push([item.category, item.amount]);
    });

    setUserIncomesByCategory(incomeArray);
    console.log(userIncomesByCategory);
  };

  const setExpenseCategory = function () {
    const expenseArray: any = [];
    expenseArray.push(['Category', 'Amount']);
    userExpenses.forEach((item: any) => {
      expenseArray.push([item.category, item.amount]);
    });

    setUserExpensesByCategory(expenseArray);
  };

  const options = {
    is3D: true,
    backgroundColor: 'transparent', // Set the background color to transparent
    pieSliceTextStyle: {
      color: '#ffffff', // Set text color of pie slices
    },
    legend: {
      textStyle: {
        color: theme === 'dark' ? '#E5E7EB' : '#374151',
      },
    },
  };
  // text-gray-700 dark:text-gray-200

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounderd-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Income</h3>
              <p className="text-2xl">€{userIncomesSum}</p>
            </div>
            <HiArrowNarrowUp className="text-green-600 text-5xl shadow-lg p-3 rounded-full" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className=" flex items-center">
              <HiOutlineInformationCircle />
              {userIncomeCount}
            </span>
            <div className="text-gray-500">Income Records</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounderd-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Expenses
              </h3>
              <p className="text-2xl">€{userExpensesSum}</p>
            </div>
            <HiArrowNarrowDown className="text-red-600 text-5xl shadow-lg p-3 rounded-full" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className=" flex items-center">
              <HiOutlineInformationCircle />
              {userExpensesCount}
            </span>
            <div className="text-gray-500">Expenses Records</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounderd-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Current Balance
              </h3>
              <p className="text-2xl">€{userIncomesSum - userExpensesSum}</p>
            </div>
            <HiCurrencyEuro className="text-black-600 text-5xl shadow-lg p-3 rounded-full" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className=" flex items-center">
              <HiOutlineInformationCircle />
              {userIncomeCount + userExpensesCount}
            </span>
            <div className="text-gray-500">Total transactions</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-3">Income Chart</h1>
            <Button outline gradientDuoTone="purpleToBlue">
              <Link to={'/dashboard?tab=income'}>See all</Link>
            </Button>
          </div>
          <Chart
            chartType="PieChart"
            data={userIncomesByCategory}
            options={options}
            width={'500px'}
            height={'400px'}
          />
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-3">Expenses Chart</h1>
            <Button outline gradientDuoTone="purpleToBlue">
              <Link to={'/dashboard?tab=expenses'}>See all</Link>
            </Button>
          </div>
          <Chart
            chartType="PieChart"
            data={userExpensesByCategory}
            options={options}
            width={'500px'}
            height={'400px'}
          />
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-3">Latest Transactions</h1>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Time</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {latestTransactions.slice(0, 7).map((transaction) => (
                <Table.Row
                  key={transaction._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{transaction.title}</Table.Cell>
                  <Table.Cell
                    className={
                      transaction.type === 'income'
                        ? 'text-green-700 font-semibold'
                        : 'text-red-700 font-semibold'
                    }
                  >
                    {transaction.type === 'income'
                      ? transaction.amount
                      : -transaction.amount}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(transaction.createdAt).toLocaleString('lt-LT')}
                  </Table.Cell>
                  <Table.Cell>{transaction.description}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
