import Image from "next/image";
import emptySvg from "../../public/empty.svg";

export default function Empty() {
  return (
    <section className="flex flex-col justify-center items-center gap-10 py-12 mt-10 max-lg:h-[70vh]">
      <h4 className="text-center leading-normal max-lg:text-xl max-sm:text-base">
        Stay ahead of the weather! <br /> Find the current conditions in any
        city with a quick search.
      </h4>
      <Image priority src={emptySvg} width={600} height={600} alt="empty svg" />
    </section>
  );
}
