import { useState } from "react";
import { useIssues } from "../hooks";
import { IssueList, LabelPicker } from "../components";
import { Spinner } from "../../shared/components";
import { State } from "../../interfaces";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setstate] = useState<State>();
  const { issuesQuery } = useIssues({ state, labels: selectedLabels});

  const onLabelChange = (label: string) => {
    selectedLabels.includes(label)
      ? setSelectedLabels(selectedLabels.filter((item) => item !== label))
      : setSelectedLabels([...selectedLabels, label]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <Spinner />
        ) : (
          <IssueList
            issues={issuesQuery.data || []}
            state={state}
            onStateChanged={(newState) => setstate(newState)}
          />
        )}
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={onLabelChange} />
      </div>
    </div>
  );
};
