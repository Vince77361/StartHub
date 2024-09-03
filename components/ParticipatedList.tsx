interface ParticipatedListProps {
  participant: string[];
}

const ParticipatedList: React.FC<ParticipatedListProps> = ({ participant }) => {
  return (
    <div className="flex flex-col gap-y-3 bg-[#1e1e1e] border border-[#848484] w-full min-h-96 self-center rounded-2xl p-8 my-8">
      {participant.map((key) => (
        <p key={key} className="text-xl font-bold">
          {key}
        </p>
      ))}
    </div>
  );
};

export default ParticipatedList;
