import { Button, TabItem, Tabs } from "flowbite-react";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiRefresh } from "react-icons/bi";
import QRCode from "react-qr-code";
import Modal from "react-responsive-modal";
import { useNavigate, useParams } from "react-router-dom";
import ItemList from "../components/ItemList";
import Navbar from "../components/Navbar";
import ParticipantList from "../components/ParticipantList";
import { LoadingAtom } from "../states/loading";
import { Bill } from "../types/dashboard";
import moment from "moment";

async function getBillData(code: string): Promise<Bill> {
  return {
    code: code,
    title: "Bill Example",
    description: "Transfer ke rekening BCA 1234567890 a.n Squidward Tentacles.",
    date: new Date(2024, 2, 1),
    isHost: true,
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
        id: 1,
        name: "Spongebob Squarepants",
        orders: [
          {
            id: 1,
            itemId: 1,
            quantity: 1,
          },
        ],
      },
      {
        id: 2,
        name: "Patrick Star",
        orders: [
          {
            id: 2,
            itemId: 2,
            quantity: 1,
          },
        ],
      },
    ],
  };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { code } = useParams()!;
  const setIsLoading = useSetAtom(LoadingAtom);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [bill, setBill] = useState<Bill | null>(null);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getBillData(code!)]).then(([bill]) => {
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

  function handleRefresh() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 5000);
  }

  return (
    <>
      <div className="p-5">
        <Navbar
          title={bill?.title ?? ""}
          onBack={() => navigate(-1)}
          actions={
            <Button color="transparent" onClick={handleRefresh}>
              <BiRefresh className="p-0" size={25} />
            </Button>
          }
        />

        <section className="flex flex-row mb-5 space-x-3">
          <div className="flex flex-row items-center justify-between w-2/3 px-2 bg-gray-600 rounded-lg">
            <span className="text-2xl font-bold">{bill?.code}</span>
            <a
              className="text-sm hover:text-gray-300"
              onClick={() => copyToClipboard(bill?.code ?? "")}
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
          <h2 className="text-lg font-bold">Date</h2>
          {bill?.date == null ? "" : formatDate(bill.date)}
        </section>

        <section className="mb-3">
          <h2 className="text-lg font-bold">Note</h2>
          <p>{bill?.description}</p>
        </section>

        <section>
          <Tabs style="underline" className="">
            <TabItem title="Participants">
              <ParticipantList
                bill={bill}
              />
            </TabItem>
            <TabItem title="Items">
              <ItemList />
            </TabItem>
          </Tabs>
        </section>
      </div>

      <Modal
        open={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        center
      >
        <QRCode value={bill?.code ?? ""} size={256} />
      </Modal>
    </>
  );
}

function formatDate(date: Date): string {
  return moment(date).format("dddd, MMMM Do YYYY");
}
