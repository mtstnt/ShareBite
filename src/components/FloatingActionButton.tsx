import { Button } from "flowbite-react";

type Props = {
  tooltip?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
} & React.PropsWithChildren;

export default function FloatingActionButton({ tooltip, onClick, children }: Props) {
  return (
    <Button
      onClick={onClick}
      title={tooltip}
      className="absolute w-12 h-12 text-2xl font-bold rounded-full bottom-5 right-5"
    >
      { children }
    </Button>
  );
}
