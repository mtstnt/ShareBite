import { BiArrowBack } from "react-icons/bi";

type Props = {
  title: string;
  onBack: () => void;
  actions?: React.ReactNode;
}

export default function Navbar({ title, onBack, actions }: Props) {
  return (
    <header className="flex flex-row items-center justify-between flex-1 mb-3">
      <div>
        <div className="flex flex-row items-center justify-center space-x-5">
          <BiArrowBack
            className="block"
            cursor="pointer"
            onClick={onBack}
          />
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
      </div>
      <div>
        {actions}
      </div>
    </header>
  )
}
