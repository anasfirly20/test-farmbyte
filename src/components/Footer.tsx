import githubSvg from "../../public/github-mark.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <a
      href="https://github.com/anasfirly20/test-farmbyte"
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-center pb-4"
    >
      <Image src={githubSvg} alt="github mark" width={30} height={30} />
    </a>
  );
}
