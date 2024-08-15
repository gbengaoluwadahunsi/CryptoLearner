import moment from 'moment';
import { useGetCryptoNewsQuery } from '../../api/CryptoNewsApi';
import { useGetCryptoCoinsQuery } from "../../api/CryptoApi";
import { useState } from 'react';

interface CryptoCoin {
  id: string | number;
  name: string;
}

const CryptoNews = () => {
  const { data: cryptoNews, isFetching, error } = useGetCryptoNewsQuery(100);
  const { data: cryptoCoins } = useGetCryptoCoinsQuery(100);
  const [showMore, setShowMore] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const screenWidth = window.innerWidth >768

  const handleCryptoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrypto(event.target.value);
  };

 

  // Filter the news based on the selected cryptocurrency
  const filteredNews = selectedCrypto
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? cryptoNews?.filter((news: any) =>
        news.title.toLowerCase().includes(selectedCrypto.toLowerCase())
      )
    : cryptoNews;

  const cryptos = showMore ? filteredNews : screenWidth? filteredNews?.slice(0, 9) : filteredNews?.slice(0,6);

  if (isFetching) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading news</div>;

  return (
    <section>
      <div className="flex flex-col lg:flex-row justify-between my-8 lg:text-xl items-center text-blue-500 gap-4 font-semibold">
        <h1 className='text-gray-300'>real-Time Crypto News</h1>
        <span
          className="cursor-pointer text-blue-500 hover:underline-offset-4 hover:underline"
          onClick={() => setShowMore(!showMore)}
        >
          Show {showMore ? "Less" : "More"}
        </span>
        <select
          value={selectedCrypto || ''}
          onChange={handleCryptoChange}
          className="border border-gray-300 px-8  py-2 rounded"
        >
          <option value="">All Cryptocurrencies News</option>
          
          {cryptoCoins.map((coin : CryptoCoin) => (
            <option key={coin.id} value={coin.name}>
              {coin.name}
            </option>
          ))}
        </select>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {cryptos && cryptos.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cryptos.map((news: any) => (
            <div
              key={news.link}
              className="bg-blue-600 cursor-pointer shadow-md rounded p-5 border border-gray-200 hover:shadow-lg shadow-slate-300 transition-shadow duration-300"
            >
              <a
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100"
              >
                <h3 className="lg:text-xl font-bold mb-2">
                  {news.title || 'No Title Available'}
                </h3>

                <p className="text-black lg:text-xl mb-4">
                  <strong>Summary:</strong>{' '}
                  {news.summary ? (
                    news.summary.length > 100
                      ? `${news.summary.substring(0, 100)}...`
                      : news.summary
                  ) : (
                    'No Summary Available'
                  )}
                </p>
                <p className="text-slate-100 text-sm">
                  <strong>Published:</strong>{' '}
                  {moment(news.published).startOf('hour').fromNow()}
                </p>
                <p className="text-slate-200 text-sm">
                  <strong>Language:</strong> {news.language || 'No Language Specified'}
                </p>
              </a>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No news available</div>
        )}
      </div>
    </section>
  );
};

export default CryptoNews;
