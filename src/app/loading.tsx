import { Spinner } from "@nextui-org/spinner";

export default function loading() {
  return (
    <section className="h-[70vh] flex justify-center items-center">
      <Spinner color="primary" size="lg" label="Loading..." />
    </section>
  );
}
