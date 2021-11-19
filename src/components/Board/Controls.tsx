import { Input, Button } from '@/components/Elements';
import { ClockIcon } from '@heroicons/react/solid';

type ControlsProps = {
  timeBetweenSteps: number;
  handleStartClick: () => void;
  handleNextClick: () => void;
  handlePauseClick: () => void;
  handleRandomizeClick: () => void;
  handleResetClick: () => void;
  handleTimeBetweenStepsChange: (value: number) => void;
};

const Controls = ({
  timeBetweenSteps,
  handleStartClick,
  handlePauseClick,
  handleNextClick,
  handleRandomizeClick,
  handleResetClick,
  handleTimeBetweenStepsChange,
}: ControlsProps) => {
  return (
    <div className="flex space-x-1 my-2 items-center">
      <Button size="sm" onClick={handleStartClick}>
        Start
      </Button>
      <Button size="sm" onClick={handlePauseClick}>
        Pause
      </Button>
      <Button size="sm" onClick={handleNextClick}>
        Next
      </Button>
      <Button size="sm" onClick={handleRandomizeClick}>
        Random
      </Button>
      <Button size="sm" onClick={handleResetClick}>
        Reset
      </Button>
      <div className="flex-grow">
        <Input
          LeadingIcon={ClockIcon}
          type="number"
          value={timeBetweenSteps}
          handleChange={handleTimeBetweenStepsChange}
          step={100}
        ></Input>
      </div>
    </div>
  );
};

export default Controls;
