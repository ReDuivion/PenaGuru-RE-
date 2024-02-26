import Statistik from "@/app/components/Statis/Statistik";
import UserAuth from "@/app/middleware/user";

export default function page() {
  return (
<>
<main>
    <div>
        <UserAuth/>
        <Statistik/>
    </div>
</main>
</>
    )
}
