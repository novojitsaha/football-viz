import Team from "../types/team";

interface PlayerListProps {
  team: Team | undefined;
}

const PlayerList: React.FC<PlayerListProps> = ({ team }) => {
  const players: JSX.Element[] | undefined = team?.players?.map((player) => (
    <li key={player.id}>
      {player.name}, {player.position}, {player.jersey}
    </li>
  ));

  return (
    <div className="bg-gray-200 mx-auto w-64 border border-black rounded-lg">
      {/* Card Header */}
      <div className="text-center font-bold border-b border-black">
        {team?.name}
      </div>
      {/* Formation */}
      <div>
        {team?.formation}
      </div>

      {/* Manager */}

      <div className="p-2">
        Manager: {team?.manager?.name} ({team?.manager?.country})
      </div>

      {/* Player List */}
      <ul className="text-center p-2">{players}</ul>
    </div>
  );
};

export default PlayerList;
