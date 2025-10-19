import "../CSS/inscription.css";
import Boutton from "../../composant/JSX/boutton"

function Inscription() {
  return (
    <div className="12">
      <div className="inscription-container">
        <Boutton text={3} backgroundColor={"red"}></Boutton>
        <Boutton text={4} backgroundColor={"blue"}></Boutton>
      </div>
    </div>
  )
}

export default Inscription;
