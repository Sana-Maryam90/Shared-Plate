import Toast from "../../components/Toast";
import TakeForm from "../../components/TakeForm";
import GiveInfoCard from "../../components/GiveInfoCard";


async function getRequest(id) {

  
  const res = await fetch(`http://localhost:3000/api/giveRequest/${id}`, {
    next: {
      revalidate: 60
    }
  })

  return res.json()
}

export default async function TakeRequest({params}) {
  const id = params.id;
  const request = await getRequest(id);

  // Fetched Request
  console.log(request);
  return (
    <main className="min-h-screen flex flex-col w-full items-center">
      <Toast />

      <h4 className="logo-primary w-full text-center py-5 fixed bg-white">
        SHARED PLATE
      </h4>

      <h1 className="font-notosans text-3xl md:text-5xl font-bold text-center w-11/12 mt-16">
        End <span className="text-red">Hunger</span>,{" "}
        <span className="text-green">Deliver</span> Meals
      </h1>
      <div className="flex flex-col w-full lg:flex-row">
        <div className="w-full lg:w-3/5 flex flex-col items-center">
          <GiveInfoCard title={"Give Request Details"} data={request} />
        </div>
        <div className="w-full lg:w-2/5 flex flex-col items-center">
          <TakeForm requestId={id} />
        </div>
      </div>
      {/* <div>
        <div className="hidden xl:block fixed right-0 top-32 bg-[url('/Assets/Seeds.svg')] bg-repeat h-[487px] w-52"></div>
        <div className="hidden xl:block fixed left-0 top-32 scale-x-[-1] bg-[url('/Assets/Seeds.svg')] bg-repeat h-[487px] w-52"></div>
      </div> */}
    </main>
  );
}
