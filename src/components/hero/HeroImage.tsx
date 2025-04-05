import Image from "next/image";
import profilePic from "../public/profile.jpg"; // or illustration

export const HeroImage = () => {
  return (
    <div className="w-full flex justify-center md:justify-end">
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
