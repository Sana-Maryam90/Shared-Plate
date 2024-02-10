import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="w-full flex flex-row justify-center items-center mt-5 xl:mt-9 font-sans">
        <h4 className="font-lato text-base md:text-lg xl:text-xl font-semibold">
          SHARED PLATE
        </h4>
      </div>

      <div className="absolute top-5 xl:top-8 right-5 xl:right-9 w-full flex flex-row justify-end items-center gap-5">
        <h4 className="hidden font-notoSans text-lg md:block xl:text-xl">
          Hi! Fatima Zehra
        </h4>
        <button className="text-white bg-black border rounded-full font-notoSans text-base  md:text-xl xl:text-2xl h-7 w-7 md:h-8 md:w-8 md:mr-4 xl:h-10 xl:w-10 xl:mr-9 transition-colors hover:border-black hover:bg-green">
          F
        </button>
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

        <div className="flex flex-row justify-center mt-2 gap-8 mx-4 xl:mt-4 xl:ml-9 xl:gap-16">
          <button className="bg-black border h-10 w-28 xl:h-12 xl:w-32 text-white font-notoSans font-semibold text-lg xl:text-xl transition-colors hover:border-black hover:bg-green">
            Give
          </button>
          <button className="bg-black border h-10 w-28 xl:h-12 xl:w-32 text-white font-notoSans font-semibold text-lg xl:text-xl transition-colors hover:border-black hover:bg-green">
            Deliver
          </button>
        </div>

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
