import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="z-10 w-full flex flex-row justify-center items-center mt-5 xl:mt-9 font-sans">
        <h4 className="font-lato text-base xl:text-xl font-semibold">
          SHARED PLATE
        </h4>
      </div>

      <div className="absolute top-5 xl:top-8 right-5 xl:right-9 w-full flex flex-row justify-end items-center gap-5">
        <h4 className="hidden xl:block font-notoSans text-xl">
          Hi! Fatima Zehra
        </h4>
        <div className="text-white bg-black rounded-full flex justify-center items-center font-notoSans text-base xl:text-2xl h-7 w-7 xl:h-10 xl:w-10 xl:mr-9">
          A
        </div>
      </div>

      <div className="flex flex-col my-5 xl:m-9">
        <div className="flex justify-center xl:block">
          <Image
            src="/Assets/foodWaste.svg"
            alt="Food Waste"
            className="w-[110px] h-[110px] xl:w-[400px] xl:h-[400px] rounded-full drop-shadow-[8px_8px_3px_theme('colors.red')] xl:rounded-none xl:absolute xl:top-0 xl:left-0 xl:drop-shadow-[24px_24px_0px_theme('colors.red')]"
            width={400}
            height={400}
            priority
          />
        </div>

        <h1 className="font-notoSans font-bold text-center mb-5 text-5xl mt-5 animate-zoomIn xl:mb-0 xl:mx-[410px] xl:text-8xl leading-tight xl:leading-normal">
          <span className="text-red">Waste</span> Less, <br />{" "}
          <span className="text-green">Give</span> More
        </h1>

        <div className="flex justify-center xl:block">
          <Image
            src="/Assets/donateFood.svg"
            alt="Food Donation"
            className="w-[110px] h-[110px] rounded-full drop-shadow-[8px_8px_3px_theme('colors.green')] xl:w-[400px] xl:h-[400px] xl:rounded-none xl:absolute xl:bottom-0 xl:right-0 xl:drop-shadow-[-24px_-24px_0px_theme('colors.green')]"
            width={400}
            height={400}
            priority
          />
        </div>

        <p className="font-notoSans font-medium text-center text-sm mt-6 mb-6 mx-8 xl:text-xl xl:mt-12 xl:mb-8 xl:mx-[410px]">
          Our platform connects generous hearts with those in need, creating a
          seamless bridge to combat hunger and reduce food waste. Join us in our
          mission to foster a community of sharing and kindness, one meal at a
          time. Together, let's make a meaningful impact and nourish lives with
          every click.
        </p>

        <div className="flex flex-row justify-center mt-2 gap-8 mx-4 xl:mt-4 xl:ml-9 xl:gap-16">
          <button className="bg-black border h-8 w-24 xl:h-12 xl:w-28 text-white font-notoSans font-semibold text-base xl:text-xl transition-colors hover:border-black hover:bg-green">
            Give
          </button>
          <button className="bg-black border h-8 w-24 xl:h-12 xl:w-28 text-white font-notoSans font-semibold text-base xl:text-xl transition-colors hover:border-black hover:bg-green">
            Deliver
          </button>
        </div>
      </div>
    </main>
  );
}
