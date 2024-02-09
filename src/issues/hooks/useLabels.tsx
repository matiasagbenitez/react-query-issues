import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api";
import { Label } from "../../interfaces/label";
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
    staleTime: 1000 * 60 * 1, // ms * s * m = X minutes

    // Confía en la data inicial mientras se carga la data real
    // Refrescará la data luego del staleTime
    // initialData: []

    // Información que se muestra mientras se carga la data
    // placeholderData: [],
  });

  return { labelsQuery };
};
