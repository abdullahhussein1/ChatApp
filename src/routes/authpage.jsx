import logo from "../assets/favicon.svg";
import google from "../assets/google.png";
import { useSignInMutation } from "../features/api/apiSlice";
import { RotatingLines } from "react-loader-spinner";

export default function Auth() {
  const [signIn, { isLoading }] = useSignInMutation();

  const handleSignIn = async () => {
    await signIn().unwrap();
  };

  return (
    <div className="p-5 h-[100dvh]  w-screen bg-gray-50">
      <div className="flex relative max-w-xl mx-auto rounded-3xl bg-white p-5 flex-col h-full w-full justify-center items-center">
        <div className="flex items-center gap-1 absolute top-5 left-5 self-start font-bold">
          <img
            draggable="false"
            src={logo}
            alt="app icon"
            className="size-7  flex-none select-none"
          />
          <p className="font-mono">Connect</p>
          <p className="text-gray-500 text-xs font-normal">
            , your daily chat app
          </p>
        </div>
        <button
          onClick={handleSignIn}
          className="flex gap-2 items-center hover:tracking-tight active:scale-95 justify-center transition-all border border-gray-200/80 rounded-2xl w-11/12 font-bold px-3 py-2 hover:bg-gray-50"
        >
          {isLoading ? (
            <RotatingLines
              width="25"
              strokeColor="black"
              animationDuration="0.75"
              strokeWidth="3"
            />
          ) : (
            <>
              <img
                draggable="false"
                src={google}
                alt="google icon"
                className="size-5 flex-none select-none"
              />
              <p>Sign in with Google</p>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
