import { useState } from "react";
import { useIssues, useIssuesInfinite } from "../hooks";
import { IssueList, LabelPicker } from "../components";
import { Spinner } from "../../shared/components";
import { State } from "../../interfaces";

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setstate] = useState<State>();
  const { issuesQuery } = useIssuesInfinite({
    state,
    labels: selectedLabels,
  });

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
            issues={issuesQuery.data?.pages.flat() || []}
            state={state}
            onStateChanged={(newState) => setstate(newState)}
          />
        )}
        <button
          className="btn btn-outline-primary mt-2 btn-sm"
          onClick={() => issuesQuery.fetchNextPage()}
          disabled={!issuesQuery.hasNextPage || issuesQuery.isFetchingNextPage}
        >
          Load more...
        </button>
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={onLabelChange} />
      </div>
    </div>
  );
};
