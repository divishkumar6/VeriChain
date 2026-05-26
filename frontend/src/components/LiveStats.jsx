import CounterCard
from "./CounterCard";

function LiveStats() {

  return (

    <section className="
      relative
      px-8
      py-24
    ">

      <div className="
        max-w-7xl
        mx-auto
      ">

        <div className="
          text-center
          mb-20
        ">

          <h2 className="
            text-6xl
            font-black
          ">

            Blockchain Statistics

          </h2>

          <p className="
            mt-6
            text-white/60
            text-xl
          ">

            Real-time credential
            verification ecosystem.

          </p>

        </div>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-8
        ">

          <CounterCard
            number="25K+"
            label="Certificates Issued"
            glow="bg-cyan-400"
          />

          <CounterCard
            number="99.99%"
            label="Verification Accuracy"
            glow="bg-purple-500"
          />

          <CounterCard
            number="12K+"
            label="Blockchain Transactions"
            glow="bg-green-400"
          />

        </div>

      </div>

    </section>
  );
}

export default LiveStats;