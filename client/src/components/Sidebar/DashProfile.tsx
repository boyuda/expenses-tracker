import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Alert, Avatar, Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

// TODO: If using with typescript upon submittin it sets all the values to empty strings
export default function DashProfile() {
  // States
  const { currentUser, error } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState('');
  const [updateUserError, setUpdateUserError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateUserError('');
    setUpdateUserSuccess('');
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No Changes Made');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess('Users profile updated successfully!');
      }
    } catch (error: any) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeteleAccount = async () => {
    setShowModal(false);

    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser?._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error: any) {
      deleteUserFailure(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      {/*  */}
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="self-center cursor-pointer">
          <Avatar
            alt="user"
            rounded
            size="lg"
            className="w-full h-full border-2 rounded-full border-[lightgray] object-cover"
          />
        </div>
        <div>
          <Label value="Your username" />
          <TextInput
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser?.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label value="Your email" />
          <TextInput
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser?.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label value="Your password" />
          <TextInput
            type="password"
            id="password"
            placeholder="username"
            defaultValue={'********'}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" gradientDuoTone={'purpleToBlue'}>
          Update Details
        </Button>
      </form>
      <div className="text-red-400">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>
          Delete Account
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}

      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeteleAccount}>
                "Yes, I'm sure"
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
