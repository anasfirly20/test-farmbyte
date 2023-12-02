import Image from "next/image";
import errorSvg from "../../public/error.svg";

export default function Error() {
  return (
    <section className="flex flex-col justify-center items-center gap-10 py-12 mt-10">
      <Image src={errorSvg} alt="error svg" width={600} height={600} />
      <p>An error has occurred, please try again.</p>
    </section>
  );
}
