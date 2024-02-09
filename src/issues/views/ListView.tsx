import { useEffect, useState } from "react";
import { IssueList, LabelPicker } from "../components";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const onLabelChange = (label: string) => {
    selectedLabels.includes(label)
      ? setSelectedLabels(selectedLabels.filter((item) => item !== label))
      : setSelectedLabels([...selectedLabels, label]);
  };

  useEffect(() => {
    console.log("Selected labels:", selectedLabels);
  }, [selectedLabels]);

  return (
    <div className="row mt-5">
      <div className="col-8">
        <IssueList />
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={onLabelChange} />
      </div>
    </div>
  );
};
