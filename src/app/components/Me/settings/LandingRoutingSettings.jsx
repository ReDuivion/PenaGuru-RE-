"use client";
import { useRouter } from "next/navigation";

export default function LandingRoutingSettings() {
  const router = useRouter();

  function handleUpdate() {
    router.push("/me/edit");
  }

  function changePassword() {
    router.push("/change-password");
  }

  function handleSignOut() {
    router.push("/SignOut");
  }
  return (
    <>
      <main>
        <div className="container">
          <section className="flex">
            <div>
        <button className='btn'>Test</button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
