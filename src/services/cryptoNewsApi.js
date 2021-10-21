import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const crytoApiheaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': 'b40fac6f5amsh9e7a64c9f4b5f15p175d8cjsn468f1588856c'
} 

const baseUrl = "https://bing-news-search1.p.rapidapi.com"


const createRequest = (url) => ({url, headers:crytoApiheaders});

export const cryptoNewsApi = createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory , count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const {useGetCryptoNewsQuery} = cryptoNewsApi;