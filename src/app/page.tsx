import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <section className="py-normal px-longer">
      <div className="flex items-center justify-between">
        <Input
          type="text"
          placeholder="Enter a city..."
          variant="bordered"
          size="sm"
          radius="md"
          className="w-[89%]"
        />
        <Button
          color="primary"
          size="lg"
          radius="md"
          className="w-[10%] bg-sky-600"
        >
          Search
        </Button>
      </div>
    </section>
  );
}
