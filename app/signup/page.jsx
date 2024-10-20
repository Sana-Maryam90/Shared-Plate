import Link from "next/link";
import Toast from "../components/Toast";
import SignUpForm from "../components/SignUpForm";

export default function SignUp() {
  return (
    <main className="flex min-h-screen">
      <Toast />
      {/* SignUp form with logo for all screens*/}
      <div className="w-full lg:w-1/2 bg-bgwhite flex flex-col items-center">
        <h4 className="logo-primary mt-5 lg:mt-9">SHARED PLATE</h4>

        <div className="flex flex-col items-center justify-center h-full w-3/4 md:w-1/2 lg:w-3/4 xl:w-2/5">
          <h1 className="font-notosans text-4xl md:text-5xl font-bold">
            Sign Up
          </h1>

          <SignUpForm />
          
          {/* Sign Up button for small screens*/}
          <p className="lg:hidden font-notosans text-lg font-medium text-center">
            If you already have an account,{" "}
            <Link
              href={"/login"}
              className="text-green font-semibold cursor-pointer"
            >
              Login
            </Link>{" "}
            here
          </p>
        </div>
      </div>

      {/* Image Background only on big screens*/}
      <div className="hidden lg:block w-1/2 h-screen bg-[url('/Assets/foodWaste.svg')] bg-cover bg-center">
        <div className="bg-gradient-to-br from-red/70 to-green/70  backdrop-brightness-75 backdrop-opacity-10 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-5xl text-bgwhite font-bold font-notoSans text-center leading-normal mx-6">
            Be a Part of Something Meaningful
          </h1>
          <p className="text-xl text-bgwhite font-notoSans font-medium my-9 text-center">
            If you already have an account, Login Below
          </p>
          <Link href={"/login"}>
            <button className="btn-primary bg-bgwhite text-black hover:bg-black hover:text-bgwhite">
              Login
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
