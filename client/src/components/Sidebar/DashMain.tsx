import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button } from 'flowbite-react';
import {
  HiCurrencyEuro,
  HiArrowNarrowUp,
  HiArrowNarrowDown,
  HiOutlineInformationCircle,
} from 'react-icons/hi';

export default function DashMain() {
  ////////
  // States
  ///////
  const [userIncomes, setUserIncomes] = useState([]);
  const [userIncomesSum, setUserIncomesSum] = useState(0);
  const [userIncomeCount, setUserIncomesCount] = useState(0);
  const { currentUser } = useSelector((state: RootState) => state.user);
  // Expenses state

  useEffect(() => {
    fetchIncomes();
    console.log(userIncomeCount, userIncomesSum, userIncomes);
  }, [currentUser]);

  ////////
  // Functions
  ///////
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
              <p className="text-2xl">€{userIncomesSum}</p>
            </div>
            <HiArrowNarrowDown className="text-red-600 text-5xl shadow-lg p-3 rounded-full" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className=" flex items-center">
              <HiOutlineInformationCircle />
              {userIncomeCount}
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
              <p className="text-2xl">€{userIncomesSum}</p>
            </div>
            <HiCurrencyEuro className="text-black-600 text-5xl shadow-lg p-3 rounded-full" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className=" flex items-center">
              <HiOutlineInformationCircle />
              {userIncomeCount}
            </span>
            <div className="text-gray-500">Income Records</div>
          </div>
        </div>
      </div>
    </div>
  );
}
