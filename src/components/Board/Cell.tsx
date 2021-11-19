import clsx from 'clsx';

const variants = {
  active: 'bg-yellow-300',
  inactive: 'bg-gray-700',
};

type CellProps = {
  variant: keyof typeof variants;
  handleClick: () => void;
};

const Cell = ({ variant, handleClick }: CellProps) => {
  return (
    <div
      className={clsx('w-5 h-5 border border-gray-600', variants[variant])}
      onClick={handleClick}
    ></div>
  );
};

export default Cell;
