import Toast from "../components/Toast";
import GiveForm from "../components/GiveForm";

export default function Give () {
    return (
      <main className="min-h-screen flex flex-col w-full items-center">
        <Toast />

        <h4 className="logo-primary w-full text-center py-5 fixed bg-white">
          SHARED PLATE
        </h4>

        <div className="flex flex-col items-center justify-center w-11/12 mt-16">
          <h1 className="font-notosans text-3xl md:text-5xl font-bold text-center">
            End <span className="text-red">Hunger</span>,{" "}
            <span className="text-green">Share</span> Your Plate
          </h1>

          <GiveForm />
          
        </div>
        <div>
          <div className="hidden xl:block fixed right-0 top-32 bg-[url('/Assets/Seeds.svg')] bg-repeat h-[487px] w-52"></div>
          <div className="hidden xl:block fixed left-0 top-32 scale-x-[-1] bg-[url('/Assets/Seeds.svg')] bg-repeat h-[487px] w-52"></div>
        </div>
      </main>
    );
}