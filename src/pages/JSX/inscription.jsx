import "../CSS/inscription.css";
import Footer from "../../composant/JSX/footer";
import Boutton from "../../composant/JSX/boutton"

function Inscription() {
  return (
    <div className="inscription-page">
      <div className="inscription-container">
        <Boutton text="3" backgroundColor={"red"}></Boutton>
        <Boutton text="4" backgroundColor={"blue"}></Boutton>
      </div>
    </div>
  )
}

export default Inscription;
