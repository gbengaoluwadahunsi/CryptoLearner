

import { useGetCryptosQuery } from "../../api/CryptoApi";
import millify from "millify";
import Cryptocurriencies from "./Cryptocurriencies";
import CryptoNews from "./CryptoNews";

const CryptoInfoDashboard = () => {
  const { data, isFetching } = useGetCryptosQuery("");
  const data_market = data?.data?.total_market_cap;
  const total_volume = data?.data?.total_volume;

  if (isFetching) return <div>Loading...</div>;

  let total = 0;
  let tot_volume = 0;

  for (const key in data_market) {
    // eslint-disable-next-line no-prototype-builtins
    if (data_market.hasOwnProperty(key)) {
      total += data_market[key];
    }
  }

  for (const key in total_volume) {
    // eslint-disable-next-line no-prototype-builtins
    if (total_volume.hasOwnProperty(key)) {
      tot_volume += total_volume[key];
    }
  }

  return (
    <section className="flex flex-col gap-8 ">
      <div className="lg:text-xl text-slate-500 font-semibold">
        <h1 className="lg:text-2xl  text-blue-800 font-extrabold">Crypto Statistics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="flex gap-8">
            <h4>Total Cryptocurrencies</h4>
            <span className="text-white">{millify(data?.data?.active_cryptocurrencies)}</span>
          </div>
          <div className="flex gap-8">
            <h4>Total Volume</h4>
            <span className="text-white">{(tot_volume / 1000000000000).toFixed(2)}T</span>
          </div>
          <div className="flex gap-8">
            <h4>Total Market Cap</h4>
            <span className="text-white">{(total / 1000000000000).toFixed(2)} T</span>
          </div>
          <div className="flex gap-8">
            <h4>Total Markets</h4>
            <span className="text-white">{millify(data?.data?.markets)}</span>
          </div>
        </div>
      </div>
      <section>
        
        <Cryptocurriencies  />
      </section>

      <section className="mt-10">
        
        <CryptoNews />
      </section>
    </section>
  );
};

export default CryptoInfoDashboard;
