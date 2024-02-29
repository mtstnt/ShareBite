import {
  Badge,
  Button,
  Card,
  Datepicker,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Nullable<T> = T | null;

type Item = {
  name: Nullable<string>;
  price: Nullable<number>;
  quantity: Nullable<number>;
};

type Inputs = {
  title: string;
  description: string;
  date: Date;
  items: Item[];
};

export default function Create() {
  const { register, handleSubmit, control } = useForm<Inputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const navigate = useNavigate();

  const addNewItemRow = () =>
    append({
      name: null,
      price: null,
      quantity: null,
    });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form className="w-11/12 p-5 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center mb-5">
        <BiArrowBack cursor="pointer" onClick={() => navigate(-1)} />
        <h1 className="text-3xl font-bold">🍕 Create a Bite!</h1>
      </div>

      <div className="mb-3">
        <Label className="block mb-2 font-bold" htmlFor="title">
          Title
        </Label>
        <TextInput
          {...register("title")}
          type="title"
          id="title"
          required
          helperText={
            <small className="text-gray-50">
              This will be shown after people scanned your QR Code or entered
              the number code!
            </small>
          }
        />
      </div>

      <div className="mb-3">
        <Label className="block mb-2 font-bold" htmlFor="description">
          Description
        </Label>
        <Textarea
          {...register("description")}
          id="description"
          helperText={
            <small className="text-gray-50">
              Whatever you want to say to them (maybe how they can pay?)
            </small>
          }
        />
      </div>

      <div className="mb-3">
        <Label className="block mb-2 font-bold" htmlFor="date">
          Date
        </Label>
        <Datepicker
          {...register("date")}
          id="date"
          defaultDate={new Date()}
          required
        />
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Items</h3>
          <Button onClick={addNewItemRow}>Add</Button>
        </div>

        <small className="text-xs text-gray-50">
          The items listed in the bill. <br />
          Everyone in the bill can choose what they ordered from here.
        </small>

        <div className="my-3 space-y-6">
          {fields.map((e, index) => (
            <Card key={e.id} className="relative">
              <Badge
                onClick={() => remove(index)}
                className="absolute p-3 rounded-full cursor-pointer -top-4 -right-4"
                color="failure"
              >
                <FaTrash />
              </Badge>
              <TextInput
                {...register(`items.${index}.name`)}
                type="name"
                id="name"
                placeholder="Name"
              />
              <div className="flex flex-row space-x-3">
                <TextInput
                  className="flex-1"
                  {...register(`items.${index}.price`, { min: 0 })}
                  type="number"
                  id="price"
                  placeholder="Price/pcs"
                />
                <TextInput
                  className="flex-1"
                  {...register(`items.${index}.quantity`, { min: 0 })}
                  type="number"
                  id="quantity"
                  placeholder="Qty"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Button className="w-full" color="success" type="submit">
        Submit
      </Button>
    </form>
  );
}
