import { useInfiniteQuery } from "@tanstack/react-query";
import { Issue, State } from "../../interfaces";
import { sleep } from "../../helpers";
import { githubApi } from "../../api";

interface Props {
  labels: string[];
  state?: State;
  page?: number;
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}

const getIssues = async ({
  pageParam = 1,
  queryKey,
}: QueryProps): Promise<Issue[]> => {
  const [, , args] = queryKey;
  const { labels, state } = args as Props;

  await sleep(2);

  const params = new URLSearchParams();
  if (state) params.set("state", state);
  if (labels.length) params.set("labels", labels.join(","));

  params.append("page", pageParam.toString());
  params.append("per_page", "5");

  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssuesInfinite = ({ labels, state }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, labels }],
    queryFn: (data) => getIssues(data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return;
      return pages.length + 1;
    },
  });

  return { issuesQuery };
};
