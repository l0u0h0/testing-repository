# React

`리액트 기능 테스트 및 스터디 레포지토리`

> ## 목차
>
> - [hooks](#hooks)
> - [Context](#context)

## Hooks

> [useTransition](#usetransition)

### useTransition

- `낮은 우선순위 상태 업데이트를 표시`

  - 10000개의 DOM 객체를 검색하는 입력 값이 존재한다할 때,
  - 필터링 메서드로 인한 검색 결과 상태값이 같이 제어가 된다면 마지막 1회에 리렌더링을 시키는 리액트 특성 상 input 태그 내의 value가 뒤늦게 화면에 출력되거나 지연되어 끊기는 현상 발생.
  - 이를 방지하고자 필터링 메서드를 Transition으로 묶어 지연 업데이트 시킴으로써 input 태그에는 영향을 끼치지 않도록 하여 사용자 경험 개선을 꾀할 수 있다.
  - onChange로 인해 변하는 inputValue와 filteredItems는 서로 다른 우선순위로 업데이트 시킴으로 filteredItems의 긴 처리 시간을 inputValue와 독립시킬 수 있다.
  - 내용
    - `isPending`은 해당 Transition이 실행중인지 여부를 `boolean`으로 반환,
    - `startTransition`은 콜백을 인자로 받으며 해당 콜백을 Transition으로 묶어 우선순위를 후위로 둔다.
    - 콜백은 동기 함수여야한다.

- 코드

```typescript
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
```

## Context

> Context
