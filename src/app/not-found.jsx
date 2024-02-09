import Image from "next/image"
import pagenotfound from "../../public/pagenotfound.png"
export default function notFound() {
  return (
    <>
    <main className="flex justify-center">
      <main className="h-screen items-center">
        <div className="text-2xl font-bold"></div>
        <Image src={pagenotfound} />
        <div className="">
        <h1 className="flex justify-center text-3xl font-bold text-sky-500 mt-3">Page Not Found!</h1>
        <h1 className="mt-3">Page yang anda cari mungkin telah dipindahkan, dihapus, atau mungkin tidak pernah ada!</h1>
        </div>
      </main>
    </main>
    </>
  );
}
