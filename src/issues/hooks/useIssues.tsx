import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api";
import { sleep } from "../../helpers";
import { Issue, State } from "../../interfaces";
import { useEffect, useState } from "react";

interface Props {
  labels: string[];
  state?: State;
  page?: number;
}

const getIssues = async ({ labels, state, page = 1 }: Props): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();
  if (state) params.set("state", state);
  if (labels.length) params.set("labels", labels.join(","));

  params.append("page", page.toString());
  params.append("per_page", "5");

  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ labels, state }: Props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [labels, state]);
  
  const issuesQuery = useQuery({
    queryKey: ["issues", { labels, state, page }],
    queryFn: () => getIssues({labels, state, page}),
  });

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage((prev) => prev + 1);
  }

  const prevPage = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  }

  return {
    // Props
    issuesQuery,

    // Getters
    page: issuesQuery.isFetching ? 'Loading...' : page,

    // Methods
    nextPage,
    prevPage,
  };
};
