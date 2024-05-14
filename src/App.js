import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Function to fetch more data
    const fetchData = async () => {
      setIsLoading(true);
      // Simulating an API call to fetch data
      const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${page}&limit=10`);
      const newData = await response.json();
      setItems(prevItems => [...prevItems, ...newData]);
      setIsLoading(false);
    };

    // Fetch data when page changes
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Function to handle scrolling
  

  // Add event listener for scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight
      ) {
        setPage(page + 1);
      }
      
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);
  // const [data, SetData] = useState([]);
  // const [page, SetPage] = useState(20);
  // const [hasMore, SethasMore] = useState(true);

  // useEffect(()=>{
  //   const getData = async () =>{
  //     const res = await fetch('https://api.escuelajs.co/api/v1/products?offset=10&limit=12');
  //     const res1 = await res.json();
  //     SetData(res1);
  //   }
  //   getData();
  // },[]);

  // const fetchData = async () => {
  //     fetch(`https://api.escuelajs.co/api/v1/products?offset=${page}&limit=12`)
  //     .then((res)=> res.json())
  //     .then((res1)=> {
  //       SetData((res1)=> [...data, ...res1])
  //       res1.length > 0 ? SethasMore(true) : SethasMore(false);
  //     });
  //     SetPage((page) => page+10);
  // };

  return (
    <div className="App">
      <h1>Infinite Scrolling</h1>
      {/* <InfiniteScroll
        dataLength={data.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div>
          {data && data.map((item)=>
            <div className='box'>{item.title}</div>
          )}
        </div>
      </InfiniteScroll> */}
      <div className="scroll-container">
        {items.map(item => (
          <div key={item.id} className='box'>
            <p>{item.title}</p>
          </div>
        ))}
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
