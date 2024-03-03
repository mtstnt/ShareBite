import { Badge, Button, Card, Label, Select, TextInput } from "flowbite-react";
import { Bill, Order, Participant } from "../types/dashboard";
import FloatingActionButton from "./FloatingActionButton";
import { FaCross, FaPlus, FaTrash } from "react-icons/fa";
import { useSetAtom } from "jotai";
import { LoadingAtom } from "../states/loading";
import Modal from "react-responsive-modal";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useFieldArray, useForm } from "react-hook-form";

type Props = {
  bill: Bill | null;
};

type FormModalState = {
  isShown: boolean;
  participant: Participant | null;
};

type ParticipantForm = {
  name: string;
  orders: OrderForm[];
};

type OrderForm = {
  id: number | null;
  itemId: number | null;
  quantity: number | null;
};

async function createParticipant(code: string, name: string, orders: Order[]) {
  const url = `/api/v1/bills/${code}/participants`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      orders: orders,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
}

export default function ParticipantList({ bill }: Props) {
  const setIsLoading = useSetAtom(LoadingAtom);
  const [formState, setFormState] = useState<FormModalState>({
    isShown: false,
    participant: null,
  });

  function handleOnClickCreateButton() {
    setFormState({ isShown: true, participant: null });
  }

  return (
    <>
      <FloatingActionButton onClick={handleOnClickCreateButton}>
        <FaPlus />
      </FloatingActionButton>

      <Modal
        classNames={{
          modal: "rounded-lg bg-gray-700 text-slate-50 w-11/12",
        }}
        closeIcon={
          <CgClose size={25} className="transition hover:text-red-700" />
        }
        open={formState.isShown}
        onClose={() => setFormState({ ...formState, isShown: false })}
        closeOnOverlayClick={false}
        center
      >
        <ModalForm bill={bill!} participant={formState.participant} />
      </Modal>

      <div className="space-y-3">
        {bill?.participants.map((e) => (
          <Card key={e.name}>
            <div className="flex items-center justify-between">
              <h2>{e.name}</h2>
              <Button
                onClick={() => setFormState({ isShown: true, participant: e })}
              >
                Edit
              </Button>
            </div>
            <ul className="list-disc ms-5">
              {e.orders.map((f) => (
                <li key={f.itemId}>
                  { bill?.items.find(v => v.id == f.itemId)?.name } {f.quantity}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </>
  );
}

function ModalForm({
  participant,
  bill,
}: {
  participant: Participant | null;
  bill: Bill;
}) {
  const { register, control } = useForm<ParticipantForm>({
    defaultValues: {
      name: participant?.name,
      orders: participant?.orders ?? [],
    },
  });
  const { append, remove, fields } = useFieldArray({
    control,
    name: "orders",
  });

  return (
    <div className="p-5">
      <h1 className="mb-3 text-2xl font-bold">
        {participant == null
          ? "Create a New Participant"
          : "Edit a Participant"}
      </h1>
      <div className="space-y-5">
        <div>
          <Label className="block mb-1" htmlFor="name">
            Name
          </Label>
          <TextInput {...register("name")} placeholder="Name" id="name" />
        </div>
        <div className="flex flex-row items-center justify-between">
          <h2 className="font-bold">Orders</h2>
          <Button
            onClick={() => append({ id: null, itemId: null, quantity: null })}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-col">
          {fields.map((e, index) => (
            <Card key={e.id} className="relative">
              <Badge
                onClick={() => remove(index)}
                className="absolute p-3 rounded-full cursor-pointer -top-4 -right-4"
                color="failure"
              >
                <FaTrash />
              </Badge>
              <div className="flex flex-row space-x-3">
                <Select
                  className="w-4/6 flex-2"
                  {...register(`orders.${index}.itemId`)}
                >
                  <option selected>Choose Item...</option>
                  {bill.items.map((e) => (
                    <option value={e.id}>{e.name}</option>
                  ))}
                </Select>
                <TextInput
                  className="flex-1"
                  {...register(`orders.${index}.quantity`, { min: 0 })}
                  type="number"
                  id="quantity"
                  placeholder="Qty"
                />
              </div>
            </Card>
          ))}
        </div>
        <Button className="w-full" color="success">
          Submit
        </Button>
      </div>
    </div>
  );
}
