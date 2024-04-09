import { Table, TableCell, TableRow } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

export default function DashIncomeTable() {
  //
  // States
  //
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [userIncomes, setUserIncomes] = useState<any[]>([]);
  const [showMore, setShowMore] = useState(true);
  //
  // Effects
  //
  useEffect(() => {
    // Fetching the data from the database and setting it to state
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
    fetchIncomes();
  }, [currentUser]);
  //
  // Handlers
  //
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
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto grow scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {/* Right side */}
      {userIncomes.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Added</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
            </Table.Head>
            {/* Loop through each item to fill in the table */}
            {userIncomes.map((income) => (
              <Table.Body>
                <TableRow className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="font-medium text-gray-700 dark:text-white">
                    {income.title}
                  </Table.Cell>
                  <TableCell className="text-green-700 font-semibold">
                    €{income.amount}
                  </TableCell>
                  <TableCell className="font-medium text-gray-700 dark:text-white">
                    {income.category}
                  </TableCell>
                  <Table.Cell className="font-medium text-gray-700 dark:text-white">
                    {new Date(income.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-700 dark:text-white">
                    {income.description}
                  </Table.Cell>
                </TableRow>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-blue-500 text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <span> No messages</span>
      )}
    </div>
  );
}
