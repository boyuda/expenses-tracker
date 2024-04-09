import React from 'react';
import { Table, TableCell, TableRow } from 'flowbite-react';

interface DashIncomeTableProps {
  userIncomes: any[];
  showMore: boolean;
  handleShowMore: () => void;
}

const DashIncomeTable: React.FC<DashIncomeTableProps> = ({
  userIncomes,
  showMore,
  handleShowMore,
}) => {
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
              <Table.Body key={income._id}>
                <TableRow
                  className=" bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={income.id}
                >
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
};

export default DashIncomeTable;
