import UploadFile from "./components/uploadFile";
import InfTemplate from "./components/InfTemplate";

export const dynamic = "force-dynamic"

export default async function Home() {

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24 w-full">

      <UploadFile />

      <InfTemplate/>

    </section>
  );
}
