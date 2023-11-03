import CardContainer from "./components/CardContainer";

export default function App() {
  return (
    <div className="bg-[#ecf0f7] min-h-screen flex flex-col gap-6 justify-center items-center">
      <h1 className="text-2xl md:text-3xl font-bold uppercase text-gray-800 pt-8 md:pt-6">
        Simple Image Gallery
      </h1>
      <CardContainer />
    </div>
  );
}
