import Image from "next/image";
import emptySvg from "../../public/empty.svg";

export default function Empty() {
  return (
    <section className="flex flex-col justify-center items-center gap-10 py-12 mt-10">
      <h4 className="text-center leading-normal">
        Stay ahead of the weather! <br /> Find the current conditions in any
        city with a quick search.
      </h4>
      <Image src={emptySvg} height={600} width={600} alt="empty svg" />
    </section>
  );
}
