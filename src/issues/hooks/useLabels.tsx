import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api";
import { Label } from "../../interfaces";
import { sleep } from "../../helpers";

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Label[]>("/labels");
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
  });

  return { labelsQuery };
};
