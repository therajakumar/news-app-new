"use server";

import axios from "axios";

const API_KEY = process.env.API_KEY;

export async function getNews({
  page,
  section,
  fromDate,
  toDate,
  query,
}: {
  page: number;
  section?: string;
  fromDate?: string;
  toDate?: string;
  query?: string;
}) {
  try {
    const { data } = await axios.get(
      `https://content.guardianapis.com/search?api-key=${API_KEY}&page=${page}` +
        (section ? `&section=${section}` : "") +
        (fromDate ? `&from-date=${fromDate}` : "") +
        (toDate ? `&to-date=${toDate}` : "") +
        (query ? `&q=${query}` : "")
    );

    return data.response.results || [];
  } catch (err) {
    console.error("Error fetching news:", err);
    return [];
  }
}
