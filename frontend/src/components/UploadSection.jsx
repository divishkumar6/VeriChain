import { useState }
    from "react";

import axios
    from "axios";

import { motion }
    from "framer-motion";

import {
    FaCloudUploadAlt
}
    from "react-icons/fa";

function UploadSection() {

    const [file, setFile] =
        useState(null);

    const [formData, setFormData] =
        useState({

            studentName: "",
            degree: "",
            year: "",
            institutionName: "",
        });

    const [loading, setLoading] =
        useState(false);

    const [response, setResponse] =
        useState(null);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };

    const handleUpload =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                const data =
                    new FormData();

                data.append(
                    "certificate",
                    file
                );

                Object.keys(formData)
                    .forEach((key) => {

                        data.append(
                            key,
                            formData[key]
                        );
                    });

                const res =
                    await axios.post(

                        "http://localhost:5001/api/certificate/upload-certificate",

                        data
                    );

                setResponse(res.data);

                setLoading(false);

            } catch (error) {

                console.log(error);

                setLoading(false);
            }
        };

    return (

        <section
            id="upload"
            className="
        py-32
        px-8
      "
        >

            <div className="
        max-w-4xl
        mx-auto
      ">

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 40
                    }}

                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}

                    transition={{
                        duration: 1
                    }}

                    viewport={{
                        once: true
                    }}

                    className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            p-12
          "
                >

                    <div className="
            absolute
            inset-0
            bg-gradient-to-br
            from-cyan-400/5
            to-purple-500/5
          " />

                    <div className="
            relative
            z-10
          ">

                        <div className="
              text-center
              mb-12
            ">

                            <h2 className="
                text-5xl
                font-black
              ">

                                Upload Certificate

                            </h2>

                            <p className="
                mt-4
                text-white/60
              ">

                                Secure blockchain
                                certificate issuance
                                with QR verification.

                            </p>

                        </div>

                        <form
                            onSubmit={handleUpload}
                            className="
                space-y-6
              "
                        >

                            <div className="
                grid
                md:grid-cols-2
                gap-6
              ">

                                <input
                                    type="text"
                                    name="studentName"
                                    placeholder="Student Name"
                                    onChange={handleChange}
                                    className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                    outline-none
                    focus:border-cyan-400
                  "
                                />

                                <input
                                    type="text"
                                    name="degree"
                                    placeholder="Degree"
                                    onChange={handleChange}
                                    className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                    outline-none
                    focus:border-cyan-400
                  "
                                />

                                <input
                                    type="text"
                                    name="year"
                                    placeholder="Year"
                                    onChange={handleChange}
                                    className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                    outline-none
                    focus:border-cyan-400
                  "
                                />

                                <input
                                    type="text"
                                    name="institutionName"
                                    placeholder="Institution Name"
                                    onChange={handleChange}
                                    className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                    outline-none
                    focus:border-cyan-400
                  "
                                />

                            </div>

                            <label className="
                border-2
                border-dashed
                border-cyan-400/30
                rounded-3xl
                p-12
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
                hover:border-cyan-400
                transition
              ">

                                <FaCloudUploadAlt
                                    className="
                    text-6xl
                    text-cyan-400
                    mb-6
                  "
                                />

                                <p className="
                  text-white/70
                ">

                                    Upload Certificate

                                </p>

                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) =>
                                        setFile(
                                            e.target.files[0]
                                        )
                                    }
                                />

                            </label>

                            <button
                                type="submit"
                                className="
                  w-full
                  py-5
                  rounded-2xl
                  bg-cyan-400
                  text-black
                  font-bold
                  text-lg
                  hover:scale-[1.02]
                  transition
                  shadow-glow
                "
                            >

                                {loading
                                    ? "Uploading..."
                                    : "Upload to Blockchain"}

                            </button>

                        </form>

                        {response && (

                            <div
                                className="
      mt-10
      rounded-[30px]
      border
      border-green-400/20
      bg-black/30
      p-10
    "
                            >

                                <h2 className="
      text-5xl
      font-black
      text-green-400
      mb-8
    ">

                                    Certificate Uploaded

                                </h2>

                                <div className="
      space-y-6
      text-white/80
      break-all
    ">

                                    <p className="text-2xl">

                                        <span className="
          text-white
          font-bold
        ">
                                            Certificate ID:
                                        </span>

                                        {" "}
                                        {response.certificateId}

                                    </p>

                                    <p className="text-lg">

                                        <span className="
          text-cyan-400
          font-bold
        ">
                                            SHA256 Hash:
                                        </span>

                                        <br />

                                        {response.certificateHash}

                                    </p>

                                    <p className="text-lg">

                                        <span className="
          text-purple-400
          font-bold
        ">
                                            Blockchain TX:
                                        </span>

                                        <br />

                                        {response.blockchainTx}

                                    </p>

                                </div>

                                <div className="mt-10">

                                    <img
                                        src={response.qrCode}
                                        alt="QR"
                                        className="
                                            w-64
                                            rounded-2xl
                                            border    
                                            border-white/10
                                            bg-white
                                            p-4
                                        "
                                    />

                                </div>

                            </div>
                        )}

                    </div>

                </motion.div>

            </div>

        </section>
    );
}

export default UploadSection;