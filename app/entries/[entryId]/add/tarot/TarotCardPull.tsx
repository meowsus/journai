interface Props {
  name?: string;
  isReversed: boolean;
}

export default function TarotCardPull({ name, isReversed }: Props) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {name} {isReversed ? "(Reversed)" : ""}
        </h2>
      </div>
    </div>
  );
}
