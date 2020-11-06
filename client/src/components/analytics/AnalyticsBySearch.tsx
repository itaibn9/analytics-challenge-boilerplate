import React, { useEffect, useState } from 'react'
import { Props } from "../../containers/DashBoard";
import { httpClient } from "../../utils/asyncUtils";
import { Event, EventComponentProps, UserColorProps } from "../../models"
import SearchResultTicket from './SearchResultTicket';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from "styled-components";



// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   overflow-y: scroll;
//   overflow-x: hidden;
//   width: 100%;
// `;


const AnalyticsBySearch: React.FC<Props> = ({allSearchProps}) => {
    const [searchData, setSearchData] = useState<Event[]>([]);
    const [isThereMoreData, setIsThereMoreData] = useState<boolean>(true)
    const [limit, setLimit] = useState<number>(10);
    const fetchData = React.useCallback(async (filters, offset): Promise<Event[] | string | undefined> => {
        try {
            console.log(offset);
            const { data : eventData } = await httpClient.get
            ("http://localhost:3001/events/all-filtered", {
              params: {
                ...filters  ,
                offset ,
              },
            });
            console.log(eventData);
            setSearchData(eventData.events);
            setIsThereMoreData(eventData.more)
          } catch (error) {
            return error.message;
          }
        }, [])
    useEffect(() => { 
      setSearchData([]);
      setLimit(10);
      fetchData(allSearchProps, 10); 
    }, [allSearchProps])


    return (
        <div id="scrollableDiv" >
          {searchData ? (
              <InfiniteScroll 
              dataLength={searchData.length}
                next={function () {
                  fetchData(allSearchProps, limit + 10);
                  setLimit((prev: number) => prev + 10);
                }}
                hasMore={isThereMoreData}
                height={300}
                scrollableTarget="scrollableDiv"
                loader={<h3>Loading...</h3>}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                
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
