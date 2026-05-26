import { motion }
from "framer-motion";

const activities = [

  {
    title:
      "Certificate Verified",

    tx:
      "0x8d92...fa32",

    status:
      "SUCCESS"
  },

  {
    title:
      "New Certificate Issued",

    tx:
      "0x12ac...9fd2",

    status:
      "CONFIRMED"
  },

  {
    title:
      "Blockchain Validation",

    tx:
      "0xab28...7fe1",

    status:
      "SECURE"
  },
];

function ActivityPanel() {

  return (

    <section className="
      px-8
      py-24
    ">

      <div className="
        max-w-6xl
        mx-auto
      ">

        <div className="
          rounded-[40px]
          border
          border-white/10
          bg-white/5
          backdrop-blur-2xl
          p-12
        ">

          <div className="
            flex
            items-center
            justify-between
            mb-12
          ">

            <div>

              <h2 className="
                text-5xl
                font-black
              ">

                Live Blockchain Activity

              </h2>

              <p className="
                mt-4
                text-white/60
              ">

                Real-time verification logs.

              </p>

            </div>

            <div className="
              w-4
              h-4
              rounded-full
              bg-green-400
              animate-pulse
            " />

          </div>

          <div className="
            space-y-6
          ">

            {activities.map(
              (activity, index) => (

              <motion.div

                key={index}

                initial={{
                  opacity: 0,
                  x: -20
                }}

                whileInView={{
                  opacity: 1,
                  x: 0
                }}

                transition={{
                  delay: index * 0.2
                }}

                className="
                  flex
                  items-center
                  justify-between
                  rounded-3xl
                  border
                  border-white/10
                  bg-black/20
                  p-6
                "
              >

                <div>

                  <h3 className="
                    text-xl
                    font-bold
                  ">

                    {activity.title}

                  </h3>

                  <p className="
                    mt-2
                    text-white/50
                  ">

                    {activity.tx}

                  </p>

                </div>

                <div className="
                  px-5
                  py-2
                  rounded-full
                  bg-cyan-400/20
                  text-cyan-300
                  text-sm
                ">

                  {activity.status}

                </div>

              </motion.div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default ActivityPanel;