import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  signInSuccess,
  signInStart,
  signInFailure,
} from '../redux/user/userSlice';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface IUser {
  email: string;
  password: string;
}

const initialFormData: IUser = {
  email: '',
  password: '',
};

export default function Signin() {
  // States
  const [formData, setFormData] = useState<IUser>(initialFormData);
  const { loading, error: errorMessage } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // TODO: add more messages
      if (data.success === false) {
        // setLoading(false);
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/dashboard?tab=main');
      }
      // setLoading(false);
    } catch (error: any) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left Side */}
        <div className="flex-1">
          <span className=" font-bold dark:text-white text-4xl">
            Expenses Tracker
          </span>
          <p className="text-sm mt-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        {/* Right Side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@email.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              {/* TODO:SHOW PASSWORD BUTTON */}
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> <span className="pl-3">Loading</span>
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign up here!
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure" icon={HiInformationCircle}>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
