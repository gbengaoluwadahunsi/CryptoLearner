import { useGetCryptoDetailsQuery } from "../../api/CryptoApi";

import { Link, useParams } from 'react-router-dom';

export const CryptoDetails = () => {
    const { id } = useParams();
    const { data, isFetching } = useGetCryptoDetailsQuery(id);
 
   

    
    const crypto =  data
    console.log(data)

    if (isFetching) return <div className="ml-4">Loading...</div>;
    
    return (
      <div className="bg-slate-600 min-h-screen p-8">
          <div className="container mx-auto bg-gray-800 lg:h-[80vh] my-4 text-slate-100 rounded-lg shadow-lg p-6">
              <div className="flex flex-col lg:flex-row items-center mb-6">
                  <img
                      src={crypto.image.large}
                      alt={crypto.name}
                      className="w-24 h-24 mr-4 rounded-full border border-gray-300"
                  />
                  <div>
                      <h1 className="text-3xl font-bold text-gray-200">{crypto.name}</h1>
                      <p className="text-xl text-gray-200">{crypto.symbol.toUpperCase()}</p>
                      <p className="text-blue-500 text-xl mt-2">{crypto.description.en.slice(0, 200)}...</p>
                  </div>
              </div>

              <div className=" grid  grid-cols-1 lg:grid-cols-2 text-gray-100 text-lg justfy-between lg:items-center bg-white gap-6 mb-6">
                  <div className=" p-4 lg:p-12 flex flex-col gap-4 bg-gray-700">
                      <h2 className="text-xl font-semibold text-gray-50 mb-2">Market Data</h2>
                      <p className="">Current Price: ${crypto.market_data.current_price.usd.toLocaleString()}</p>
                      <p className="">Market Cap Rank: #{crypto.market_cap_rank}</p>
                      <p className="">24h High: ${crypto.market_data.high_24h.usd.toLocaleString()}</p>
                      <p className="">24h Low: ${crypto.market_data.low_24h.usd.toLocaleString()}</p>
                      <p className="">Total Volume: ${crypto.market_data.total_volume.usd.toLocaleString()}</p>
                      
                  </div>
                  <div>
                  <div  className="flex flex-col gap-2  p-4 lg:p-12">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">Links</h2>
                      <ul>
                          {crypto.links.homepage.map((link: string, index: number) => (
                              <li key={index} className="mb-1">
                                  <a href={link} className="text-blue-500 hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                                      {link.slice(0, -1)}
                                  </a>
                              </li>
                          ))}
                      </ul>
                      <Link
                      to="/Learn"
                      className="inline-block px-6 py-3 bg-blue-500 text-white  w-fit font-semibold rounded-lg shadow-md hover:bg-blue-600"
                  >
                      Back 
                  </Link>
                    
                  </div>
                  </div>
                  
                 
            
                  
                 
              </div>

             
          </div>
      </div>
  );
};
