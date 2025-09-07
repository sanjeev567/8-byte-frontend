import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PortfolioResponse } from "./api-types";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["portfolio"],

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders(headers) {
      // headers.set("Authorization", `Bearer ${LocalSessionManager.readToken()}`);
      // headers.set("X-Platform", "web");
      return headers;
    },
    responseHandler(response) {
      // if (response.statusText === "Unauthorized") {
      //   LocalSessionManager.deleteToken();
      //   window.location.href = GLOBAL_CONFIGS.routes.auth.login;
      // }
      return response.json();
    },
  }),
  endpoints(build) {
    return {
      getPortfolioInfo: build.query<PortfolioResponse, void>({
        query: () => ({
          url: "/portfolio",
          method: "GET",
        }),
        providesTags: ["portfolio"],
        keepUnusedDataFor: 15,
      }),
    };
  },
});

export const { useGetPortfolioInfoQuery } = apiSlice;
