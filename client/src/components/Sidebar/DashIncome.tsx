import {
  Button,
  Datepicker,
  Label,
  Select,
  Table,
  TextInput,
  Textarea,
} from 'flowbite-react';
import { useState } from 'react';
export default function DashIncome() {
  // States
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div className="flex flex-col grow p-10 gap-10 md:flex-row">
      {/* Left side */}
      <div className="basis-1/4">
        <form className="flex flex-col gap-1">
          <div>
            <Label value="Income Title" />
            <TextInput
              type="text"
              placeholder="E.g. Salary"
              id="title"
              required
            />
          </div>
          <div>
            <Label value="Income Amount" />
            <TextInput
              type="text"
              placeholder="E.g. 500"
              id="amount"
              required
            />
          </div>
          {/* Add income date functioanlity */}
          {/* <>
            <Label value="Income Date" />
            <TextInput type="text" placeholder="Click to choose" />
          </> */}
          <div>
            <Label value="Select Income Category" />
            <Select id="category" required>
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
            />
          </div>

          <Button gradientDuoTone="purpleToBlue" type="submit" className="mt-5">
            Submit
          </Button>
        </form>
      </div>
      {/* Right side */}
      <div className="basis-1/2">
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
      </div>
    </div>
  );
}
