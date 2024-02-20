import Image from "next/image";
import UserType from "./components/UserType";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="w-full flex flex-row justify-center items-center mt-5 xl:mt-9 font-sans">
        <h4 className="logo-primary">SHARED PLATE</h4>
      </div>

      <div className="flex flex-col my-5 xl:m-9">
        <div className="flex justify-start xl:block">
          <Image
            src="/Assets/foodWaste.svg"
            alt="Food Waste"
            className="w-[110px] h-[110px] md:w-[200px] md:h-[200px] xl:w-[400px] xl:h-[400px] drop-shadow-[8px_8px_0px_theme('colors.red')] md:drop-shadow-[16px_16px_0px_theme('colors.red')] md:absolute md:top-0 md:left-0 md:z-0 xl:drop-shadow-[24px_24px_0px_theme('colors.red')]"
            width={400}
            height={400}
            priority
          />
        </div>

        <h1 className="font-notoSans font-bold text-center mb-5 text-5xl mt-5 animate-zoomIn md:mb-0 md:mx-[220px] xl:mx-[410px] md:text-6xl xl:text-8xl leading-tight md:leading-snug xl:leading-normal">
          <span className="text-red">Waste</span> Less, <br />{" "}
          <span className="text-green">Give</span> More
        </h1>

        <div className="flex justify-end xl:block">
          <Image
            src="/Assets/donateFood.svg"
            alt="Food Donation"
            className="w-[110px] h-[110px] md:w-[200px] md:h-[200px] xl:w-[400px] xl:h-[400px] drop-shadow-[-8px_-8px_0px_theme('colors.green')] md:drop-shadow-[-16px_-16px_0px_theme('colors.green')] md:absolute md:bottom-0 md:right-0 md:z-0 xl:drop-shadow-[-24px_-24px_0px_theme('colors.green')]"
            width={400}
            height={400}
            priority
          />
        </div>

        <p className="font-notoSans font-medium text-center text-sm my-6 mx-8 md:text-base md:my-6 md:mx-[220px] xl:text-xl xl:mt-12 xl:mb-8 xl:mx-[410px]">
          Our platform connects generous hearts with those in need, creating a
          seamless bridge to combat hunger and reduce food waste. Join us in our
          mission to foster a community of sharing and kindness, one meal at a
          time. Together, let's make a meaningful impact and nourish lives with
          every click.
        </p>

        <UserType />

        <Image
          src="/Assets/Seeds.svg"
          alt="Food Waste"
          className="hidden md:block -z-10 w-[110px] h-[110px] md:w-[200px] md:h-[200px] xl:w-[400px] xl:h-[400px] md:absolute md:top-12 md:left-10 xl:top-16 xl:left-12"
          width={400}
          height={400}
          priority
        />
        <Image
          src="/Assets/Seeds.svg"
          alt="Food Waste"
          className="hidden md:block -z-10 w-[110px] h-[110px] md:w-[200px] md:h-[200px] xl:w-[400px] xl:h-[400px] md:absolute md:bottom-9 md:right-8 xl:bottom-16 xl:right-12"
          width={400}
          height={400}
          priority
        />
      </div>
    </main>
  );
}
