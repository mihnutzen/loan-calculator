import React from 'react';

import './DataEntry.css';

interface DataEntryProps {
  label: string;
  value?: any;
  unit: string;
  min?: number;
  max?: number;
  error?: string;
  onChnage: (value: string) => void;
}

const MIN_VAL = 1;
const MAX_VAL = 1000000;

const DataEntry = ({
  label,
  value = 0,
  min = MIN_VAL,
  max = MAX_VAL,
  unit,
  onChnage,
  error
}: DataEntryProps): React.ReactElement => {
  return (
    <div className="DataEntry">
      <span>{label}</span>
      <span>
        <input
          type="number"
          value={value || ''}
          onChange={(event): void => onChnage(event.target.value)}
          min={min}
          max={max}
        />
      </span>
      <span>(in {unit})</span>
      {error && <span className="DataEntry__error">{error}</span>}
    </div>
  );
};

export default React.memo(DataEntry);
