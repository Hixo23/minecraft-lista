import { CreateServerForm } from "@/components/CreateServerForm/CreateServerForm";

const AddServer = async () => {
  return (
    <main className="w-screen min-h-screen flex justify-center items-center bg-[#111]">
      <CreateServerForm />
    </main>
  );
};

export default AddServer;
