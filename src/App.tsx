import ScoreBoard from "./components/ScoreBoard";
import PlayerList from "./components/PlayerList";
import FootballField from "./components/FootballField";

function App() {

  return (
    <div className="">
      <ScoreBoard/>
      

      <div className="flex items-center border border-black">

        <PlayerList
          teamName="X"
        />

        <FootballField/>



        <PlayerList
          teamName="Y"
        />
      </div>

    </div>


  )
}

export default App
