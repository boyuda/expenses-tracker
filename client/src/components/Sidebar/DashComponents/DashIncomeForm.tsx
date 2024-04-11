import React from 'react';
import {
  Alert,
  Button,
  Label,
  Select,
  TextInput,
  Textarea,
  Spinner,
} from 'flowbite-react';

interface DashIncomeFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  errorMessage: string | null;
}

const DashIncomeForm: React.FC<DashIncomeFormProps> = ({
  handleSubmit,
  formData,
  setFormData,
  loading,
  errorMessage,
}) => {
  return (
    <div className="basis-1/6">
      <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
        <div>
          <Label value="Income Title" />
          <TextInput
            type="text"
            placeholder="E.g. Salary"
            id="title"
            required
            value={formData.title || ''}
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
            value={formData.amount || ''}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </div>
        <div>
          <Label value="Income Category" />
          <Select
            id="category"
            required
            value={formData.category || 'Choose Category'}
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
            value={formData.description || ''}
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
  );
};

export default DashIncomeForm;
