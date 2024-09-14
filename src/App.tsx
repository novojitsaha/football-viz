import ScoreBoard from "./components/ScoreBoard";
import PlayerList from "./components/PlayerList";

function App() {

  return (
    <div className="">
      <ScoreBoard/>
      

      <div className="flex border border-black">

        <PlayerList
          teamName="Y"
        />
        <PlayerList/>
      </div>

    </div>


  )
}

export default App
