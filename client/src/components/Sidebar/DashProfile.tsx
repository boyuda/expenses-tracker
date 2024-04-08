import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Avatar, Button, Label, TextInput } from 'flowbite-react';

export default function DashProfile() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      {/*  */}
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer">
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
          />
        </div>
        <div>
          <Label value="Your email" />
          <TextInput
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser?.email}
          />
        </div>
        <div>
          <Label value="Your password" />
          <TextInput
            type="password"
            id="password"
            placeholder="username"
            defaultValue={'********'}
          />
        </div>
        <Button type="submit" gradientDuoTone={'purpleToBlue'}>
          Update Details
        </Button>
        <div className="text-red-400">
          <span>Delete Account</span>
        </div>
      </form>
    </div>
  );
}
