import React from 'react';
import { Table, TableCell, TableRow } from 'flowbite-react';

interface DashExpenseTableProps {
  userExpenses: any[];
  showMore: boolean;
  handleShowMore: () => void;
}

const DashExpenseTable: React.FC<DashExpenseTableProps> = ({
  userExpenses,
  showMore,
  handleShowMore,
}) => {
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto grow scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {/* Right side */}
      {userExpenses.length > 0 ? (
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
            {userExpenses.map((expense) => (
              <Table.Body key={expense._id}>
                <TableRow
                  className=" bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={expense.id}
                >
                  <Table.Cell className="font-medium text-gray-700 dark:text-white">
                    {expense.title}
                  </Table.Cell>
                  <TableCell className="text-red-700 font-semibold">
                    -{expense.amount} €
                  </TableCell>
                  <TableCell className="font-medium text-gray-700 dark:text-white">
                    {expense.category}
                  </TableCell>
                  <Table.Cell className="font-medium text-gray-700 dark:text-white">
                    {new Date(expense.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-700 dark:text-white">
                    {expense.description}
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
};

export default DashExpenseTable;
