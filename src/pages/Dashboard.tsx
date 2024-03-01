import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingAtom } from "../states/loading";
import QRCode from "react-qr-code";
import { Button, TabItem, Tabs } from "flowbite-react";
import Modal from "react-responsive-modal";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { Bill } from "../types/dashboard";
import DashboardParticipantComponent from "../components/DashboardParticipantComponent";

async function getBillData(code: string): Promise<Bill> {
  return {
    code: code,
    title: "Bill Example",
    description:
      "Transfer ke rekening BCA 1234567890 a.n Squidward Tentacles.",
    date: new Date(2024, 2, 1),
    items: [
      {
        id: 1,
        name: "Rawon",
        price: 35_000,
        quantity: 1,
      },
      {
        id: 2,
        name: "Ayam Goreng",
        price: 25_000,
        quantity: 2,
      },
    ],
    participants: [
      {
        name: "Spongebob Squarepants",
        order: [
          {
            itemId: 1,
            quantity: 1,
          }
        ],
      },
      {
        name: "Patrick Star",
        order: [
          {
            itemId: 2,
            quantity: 1,
          }
        ],
      }
    ],
  };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { code } = useParams();
  const setIsLoading = useSetAtom(LoadingAtom);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  if (!code) {
    navigate("/");
    return;
  }

  const [bill, setBill] = useState<Bill | null>(null);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getBillData(code)]).then(([bill]) => {
      setBill(bill);
      setIsLoading(false);
    });
  }, []);

  function copyToClipboard(code: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      toast.success("Copied to clipboard!");
    } else {
      toast.error("Clipboard unaccessible!");
    }
  }

  return (
    <>
      <div className="p-5">
        <header className="flex flex-row justify-between flex-1">
          <div>
            <div className="flex flex-row items-center justify-center mb-3 space-x-5">
              <BiArrowBack
                className="block"
                cursor="pointer"
                onClick={() => navigate(-1)}
              />
              <h1 className="text-3xl font-bold">{bill?.title}</h1>
            </div>
          </div>
        </header>

        <section className="flex flex-row mb-5 space-x-3">
          <div className="flex flex-row items-center justify-between w-2/3 px-2 bg-gray-600 rounded-lg">
            <span className="text-2xl font-bold">{code}</span>
            <a
              className="text-sm hover:text-gray-300"
              onClick={() => copyToClipboard(code)}
              href="#"
            >
              Copy
            </a>
          </div>
          <div>
            <Button onClick={() => setIsQRModalOpen(true)}>Show QR</Button>
          </div>
        </section>

        <section className="mb-3">
          { bill?.date.toLocaleString('id-ID') }
        </section>

        <section>
          <p>{bill?.description}</p>
        </section>

        <section>
          <Tabs style="underline">
            <TabItem title="Participants">
              <DashboardParticipantComponent participants={bill?.participants ?? []} />
            </TabItem>
            <TabItem title="Items">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            </TabItem>
          </Tabs>
        </section>
      </div>

      <Button className="absolute w-12 h-12 text-2xl font-bold rounded-full bottom-5 right-5">
        +
      </Button>

      <Modal
        open={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        center
      >
        <QRCode value={code} size={256} />
      </Modal>
    </>
  );
}
