import { Key, useState, useEffect } from "react";
import millify from "millify";
import { Link} from "react-router-dom";
import { useGetCryptoCoinsQuery } from "../../api/CryptoApi";
import { FaTimesCircle } from "react-icons/fa";




const Cryptocurrencies = () => {
  const { data: cryptocoins, isFetching } = useGetCryptoCoinsQuery(100);
  const [showMore, setShowMore] = useState(false);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
 
const screenWidth = window.innerWidth > 768

  useEffect(() => {
    if (cryptocoins) {
      let filteredData = cryptocoins;

      if (searchTerm) {
        filteredData = filteredData.filter((coin: { name: string; }) =>
          coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setCryptos(showMore ? filteredData : screenWidth ? filteredData.slice(0, 20) : filteredData.slice(0, 6));
    }
  }, [cryptocoins, showMore, searchTerm, screenWidth]);

  if (isFetching) return <div className="ml-4">Loading...</div>;

  return (
    <div>
      <div className="flex  flex-col lg:flex-row justify-between lg:text-xl items-center  gap-4 font-semibold ">
        <h1 className = " text-gray-300 cursor-pointer">Top {cryptos.length} Cryptocurrencies in the world</h1>
        <span
          className="cursor-pointer  text-blue-500 hover:underline-offset-4 hover:underline "
          onClick={() => setShowMore(!showMore)}
        > 
          Show {showMore ? "Less" : "More"}
        </span>
      </div>
      <div className="px-4  w-fit flex items-center gap-4  my-4">
        <input value={searchTerm}  className = 'outline-none rounded p-2 bg-gray-800 ring-1 ring-slate-600' placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={() => setSearchTerm('')}><FaTimesCircle/></button>
      </div>
      <div className="grid  grid-cols-2  lg:grid-cols-4 gap-4 lg:gap-4 lg:p-4 overflow-y-auto">
        {cryptos?.map(
          (coin: {
            id: Key | null | undefined;
            name: string | undefined;
            image: string | undefined;
            current_price: number;
            market_cap: number;
            price_change_percentage_24h: number;
          }) => {
            return (
              <div
                key={coin.id}
                className="bg-slate-600 rounded shadow-md p-4 flex flex-col"
              >
                <Link to={`/coins/${coin.id}`}>
                  <div className="flex items-center justify-between w-full mb-4">
                    <h1 className="font-extrabold">
                      {`${cryptocoins.indexOf(coin) + 1}. ${coin.name}`}
                    </h1>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      width="40"
                      height="10"
                      style={{ marginBottom: 10 }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Price: ${millify(coin.current_price)}</p>
                    <p>Market Cap: {millify(coin.market_cap)}</p>
                    <p>
                      24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  </div>
                </Link>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Cryptocurrencies;
