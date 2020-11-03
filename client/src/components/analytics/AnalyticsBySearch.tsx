import React, { useEffect, useState } from 'react'
import { Props } from "../../containers/DashBoard";
import { httpClient } from "../../utils/asyncUtils";
import { Event } from "../../models"
import SearchResultTicket from './SearchResultTicket';
import InfiniteScroll from 'react-infinite-scroll-component';



const AnalyticsBySearch: React.FC<Props> = ({allSearchProps}) => {
    const [searchOptions, setSearchOptions] = useState(allSearchProps)
    const [searchData, setSearchData] = useState([]);
    const [infinityData, setInfinityData] = useState([]);
    const [isThereMoreData, setIsThereMoreData] = useState(true)
    // const [pageNumber, setPageNumber] = useState(1);
    // const [loading, setLoading] = useState(true);
    const [offset, setOffSet] = useState(10);
    const fetchData = async (): Promise<Event[] | string | undefined> => {
        try {
            console.log(offset);
            const { data : eventData } = await httpClient.get
            (`http://localhost:3001/events/all-filtered?browser=${allSearchProps.browser}&type=${allSearchProps.type}&sorting=${allSearchProps.sorting}&search=${allSearchProps.search}&offset=${offset}`);
            setSearchData(eventData.events);
            // setInfinityData(eventData.events.slice(0,10));
            console.log(eventData);
          } catch (error) {
            return error.message;
          }
        }
    // a fake async api call
    const fetchMoreItems = () => {
        setOffSet((prev) => prev + 10);
        fetchData()
        // setTimeout(() => {
        //     setInfinityData(searchData.slice(0, offset))
        // }, 1500);
      }
    
    useEffect(() => {
        fetchData();
        // setOffSet(10);
    }, [allSearchProps])

    return (
        <div id="scrollableDiv" >
          {searchData ? (
              <InfiniteScroll 
              dataLength={100} //This is important field to render the next data
                next={fetchMoreItems}
                hasMore={isThereMoreData}
                loader={<h3>Loading...</h3>}
                scrollThreshold={0.8}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                scrollableTarget="scrollableDiv"
                style={{
                    height: '100%',
                    overflow: 'visible'
                }}
              > 
              {searchData.map((event: Event) =>
            <SearchResultTicket key={event._id}
              data={event.os}
             userName="name" userId={event.distinct_user_id}
              eventName={event.name} url={event.url} date={event.date}
            os={event.os} browser={event.browser} />
              )}
            
             </InfiniteScroll>
          ): null}
            
        </div>
    )
}

export default AnalyticsBySearch
