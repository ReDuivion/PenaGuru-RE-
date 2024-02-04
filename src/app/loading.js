import { Spinner } from "@nextui-org/react";
export default function loading() {
  return (
    <div className="h-screen flex justify-center items-center backdrop-blur-2xl bg-white/30" backdrop="opaque">
      <Spinner label="Loading" color="primary" labelColor="primary" size="lg" backdrop="opaque" />
    </div>
  );
}
