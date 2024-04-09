import {
  Alert,
  Button,
  Label,
  Select,
  Table,
  TextInput,
  Textarea,
  Spinner,
} from 'flowbite-react';
import { useState } from 'react';
import DashIncomeTable from './DashComponents/DashIncomeTable';
export default function DashIncome() {
  // States
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState<boolean>(false);

  // Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //
    //
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
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };
  // className="flex flex-col grow p-10  lg:flex-row lg:gap-10
  return (
    <div className="flex flex-col grow p-10 2xl:flex-row gap-10">
      {/* Left side */}
      <div className="basis-1/6">
        <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
          <div>
            <Label value="Income Title" />
            <TextInput
              type="text"
              placeholder="E.g. Salary"
              id="title"
              required
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div>
            <Label value="Income Amount" />
            <TextInput
              type="text"
              placeholder="E.g. 500"
              id="amount"
              required
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
          </div>
          {/* Add income date functioanlity */}
          {/* <>
            <Label value="Income Date" />
            <TextInput type="text" placeholder="Click to choose" />
          </> */}
          <div>
            <Label value="Select Income Category" />
            <Select
              id="category"
              required
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option>Choose Category</option>
              <option>Salary</option>
              <option>Bank transfer</option>
              <option>Freelancing</option>
              <option>Investments</option>
              <option>Other</option>
            </Select>
          </div>
          <div>
            <Label value="Income Description" />
            <Textarea
              placeholder="E.g. Money from Mom"
              id="description"
              required
              maxLength={20}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <Button
            gradientDuoTone="purpleToBlue"
            type="submit"
            disabled={loading}
            className="mt-5"
          >
            {loading ? (
              <>
                <Spinner size="sm" /> <span className="pl-3">Loading</span>
              </>
            ) : (
              'Submit'
            )}
          </Button>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </form>
      </div>
      {/* Right side */}
      {/* <div className="basis-1/2">
        <div>
          <Table>
            <Table.Head>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {'Monthly Salary'}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {'$1000'}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {'Salary'}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {''}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div> */}
      <DashIncomeTable />
    </div>
  );
}
