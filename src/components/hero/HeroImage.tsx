import Image from "next/image";

export const HeroImage = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <Image
        src="/istockphoto-1410538853-612x612.jpg"
        alt="Profile"
        width={400}
        height={400}
        className="rounded-2xl shadow-xl object-cover"
      />
    </div>
  );
};