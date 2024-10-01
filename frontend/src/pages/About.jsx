import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import Subscribe from "../components/subscribe";

function About() {
  return (
    <>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px] object-contain"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum
            laboriosam possimus voluptate esse officiis dicta ipsa error
            voluptatum, amet molestiae mollitia cumque repudiandae deserunt
            ipsam doloremque nesciunt adipisci placeat. Culpa.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
            repellendus pariatur doloremque dolores esse exercitationem dolorem
            cupiditate! Assumenda voluptatum minus quis quibusdam fugit sequi
            similique modi quidem, iusto repellendus sint.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero eum
            doloremque ea perferendis fugiat est nostrum inventore fugit omnis,
            ipsam laudantium provident quidem numquam, animi error facilis
            aliquid illo assumenda.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            sapiente, sed sunt soluta saepe animi nemo dolor.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            sapiente, sed sunt soluta saepe animi nemo dolor.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            sapiente, sed sunt soluta saepe animi nemo dolor.
          </p>
        </div>
      </div>

      <div className="text-center text-2xl">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px] object-contain"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            5409 William Station <br />
            Suite 350, Cape Town, South Africa
          </p>
          <p className="text-gray-500">
            Tel: (415) 555-0132 <br /> Email: admin@forever.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at forever
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>

      <Subscribe />
    </>
  );
}

export default About;
