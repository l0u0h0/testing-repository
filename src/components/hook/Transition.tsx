import { useState, useTransition } from "react";

function TestInputForm() {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState<String[]>([]);

  const items = Array.from({ length: 10000 }, (_, idx) => `Item ${idx + 1}`);

  const filteredItem = (value: string) => {
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredItems(filtered);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    startTransition(() => filteredItem(value));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-jalnangothic text-xl">useTransition Testing</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="입력 요망!"
      />
      {isPending && <p>Loading...</p>}
      <ul className="w-48 h-48 overflow-y-scroll">
        {filteredItems.map((item, idx) => (
          <li key={`items_${idx}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function OriginInputForm() {
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState<String[]>([]);

  const items = Array.from({ length: 10000 }, (_, idx) => `Item ${idx + 1}`);

  const filteredItem = (value: string) => {
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredItems(filtered);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    filteredItem(value);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-jalnangothic text-xl">origin Testing</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="입력 요망!"
      />
      <ul className="w-48 h-48 overflow-y-scroll">
        {filteredItems.map((item, idx) => (
          <li key={`items_${idx}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Transition() {
  return (
    <div className="w-full flex justify-center gap-12">
      <TestInputForm />
      <OriginInputForm />
    </div>
  );
}
