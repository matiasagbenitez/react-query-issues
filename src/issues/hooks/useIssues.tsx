import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api";
import { sleep } from "../../helpers";
import { Issue, State } from "../../interfaces";

interface Props {
  state?: State;
  labels: string[];
}

const getIssues = async (labels: string[] = [], state?: State): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();
  if (state) params.set("state", state);
  if (labels.length) params.set("labels", labels.join(","));

  params.append("page", "1");
  params.append("per_page", "5");

  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const issuesQuery = useQuery({
    queryKey: ["issues", { state, labels }],
    queryFn: () => getIssues(labels, state),
  });

  return { issuesQuery };
};
