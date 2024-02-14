import InputField from "../components/InputField";
import Link from "next/link";

export default function SignUp() {
  return (
    <main className="flex min-h-screen">
      {/* SignUp form with logo for all screens*/}
      <div className="w-full lg:w-1/2 bg-white flex flex-col items-center">
        <h4 className="logo-primary mt-5 lg:mt-9">SHARED PLATE</h4>

        <div className="flex flex-col items-center justify-center h-full w-3/4 md:w-1/2 lg:w-3/4 xl:w-2/5">
          <h1 className="font-notosans text-4xl md:text-5xl font-bold">
            Sign Up
          </h1>

          <form className="w-full my-8">
            <InputField
              id="name"
              label="Name"
              type="text"
              placeholder="John Doe"
              mt="2"
              mb="6"
            />

            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="johndoe@gmail.com"
              mt="2"
              mb="6"
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="********"
              mt="1"
              mb="6"
            />

            <div className="flex gap-4 mb-8 md:mb-12">
              <input
                type="checkbox"
                id="acceptpolicy"
                className="relative peer shrink-0 appearance-none w-4 h-4 border-2 border-black rounded-sm bg-white mt-1 checked:bg-black checked:border-0"
              />
              <label htmlFor="acceptpolicy" className="text-lg font-notosans">
                I accept the terms and conditions
              </label>
              <svg
                className="absolute w-4 h-4 mt-1 hidden peer-checked:block pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <button className="block m-auto btn-primary">Sign Up</button>
          </form>

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
          <h1 className="text-5xl text-white font-bold font-notoSans text-center leading-normal mx-6">
            Be a Part of Something Meaningful
          </h1>
          <p className="text-xl text-white font-notoSans font-medium my-9 text-center">
            If you already have an account, Login Below
          </p>
          <Link href={"/login"}>
            <button className="btn-primary bg-white text-black">Login</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
