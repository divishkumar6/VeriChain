import FeatureCard
from "./FeatureCard";

import {
  FaShieldAlt,
  FaQrcode,
  FaLock,
  FaDatabase
}
from "react-icons/fa";

function Features() {

  const features = [

    {
      title:
        "Blockchain Security",

      description:
        "Certificates are stored securely on blockchain making them immutable and tamper-proof.",

      icon:
        <FaShieldAlt />
    },

    {
      title:
        "QR Verification",

      description:
        "Every certificate contains a QR code for instant authenticity verification.",

      icon:
        <FaQrcode />
    },

    {
      title:
        "Encrypted Hashing",

      description:
        "Advanced cryptographic hashing ensures integrity of academic credentials.",

      icon:
        <FaLock />
    },

    {
      title:
        "Decentralized Storage",

      description:
        "Distributed architecture prevents data manipulation and central point failures.",

      icon:
        <FaDatabase />
    },
  ];

  return (

    <section
      id="features"
      className="
        py-32
        px-8
      "
    >

      <div className="
        max-w-7xl
        mx-auto
      ">

        <div className="
          text-center
          mb-20
        ">

          <h2 className="
            text-5xl
            font-black
          ">

            Platform Features

          </h2>

          <p className="
            text-white/60
            mt-6
            max-w-2xl
            mx-auto
          ">

            Enterprise-grade
            blockchain verification
            infrastructure built for
            institutions and employers.

          </p>

        </div>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-8
        ">

          {features.map(
            (feature, index) => (

            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;