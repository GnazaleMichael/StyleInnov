import "../CSS/accueil.css";
import Navbar from "../../composant/JSX/Navbar";
import Boutton from "../../composant/JSX/boutton";
import { LuChevronRight } from "react-icons/lu";
import Cart from "../../composant/JSX/cart";
import { LuScissors } from "react-icons/lu";
import { LuTrendingUp } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuPalette } from "react-icons/lu";
import Footer from "../../composant/JSX/footer";
import { LuMail } from "react-icons/lu";


function Accueil() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-8 pt-[200px]">
        <section className="Premiere-section">
          <div className="welcome-message">
            <h2>
              Bienvenue chez StyleInnov,
              <br /> votre plateforme de vêtements <br />
              <span>Sur-Mesure !</span>
            </h2>
            <p>
              Découvrez une expérience unique où la mode rencontre la
              personnalisation.
              <br />
              Explorez notre catalogue, choisissez vos tissus et styles
              préférés,
              <br />
              et laissez nos tailleurs experts créer des pièces qui vous
              ressemblent.
            </p>
            <a href="/catalogue"><Boutton
              backgroundColor={"white"}
              text="Commencer"
              icon={<LuChevronRight />}
              largeur={"135px"}
              className={"btnCom"}
              color={"black"}
            ></Boutton></a>
            
          </div>
        </section>
        <section className="deuxieme-section">
          <div className="T-2">
            <h2>
              Pourquoi choisir <span>TailorsConnect</span> ?
            </h2>
            <p>
              Une expérience unique pour créer des vêtements qui vous
              ressemblent.
            </p>
          </div>
          <div className="card-container">
            <Cart
              icon={LuScissors}
              title="Création Sur-Mesure"
              description="Des tailleurs expérimentés créent vos vêtements selon vos mesures exactes."
              iconBgColor="rgb(0, 255, 81)"
            />
            <Cart
              icon={LuPalette}
              title="Personnalisation Complète"
              description="Choisissez tissus, couleurs, motifs et détails pour un style unique."
              iconBgColor="#ff9544ff"
            />
            <Cart
              icon={LuUsers}
              title="Créateurs Vérifiés"
              description="Tous nos tailleurs sont certifiés et évalués par la communauté."
              iconBgColor="#006a7cff"
            />
            <Cart
              icon={LuTrendingUp}
              title="Suivi en Temps Réel"
              description="Suivez l'avancement de votre commande de la conception à la livraison."
              iconBgColor="#ff1100ff"
            />
          </div>
          <div className="T-2">
            <h2>Comment ça marche</h2>
            <p>Un processus simple en 4 étapes pour votre vêtement parfait</p>
          </div>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">01</div>
              <img
                src="/images/model.jpg"
                alt="Découvrez nos créateurs"
                className="step-image"
              />
              <h3>Découvrez</h3>
              <p>Explorez notre catalogue de créateurs et leurs spécialités</p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <img
                src="/images/tissus.jpg"
                alt="Personnalisez votre vêtement"
                className="step-image"
              />
              <h3>Personnalisez</h3>
              <p>Choisissez vos tissus, couleurs et spécifiez vos mesures</p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <img
                src="/images/machines.jpg"
                alt="Création de votre pièce"
                className="step-image"
              />
              <h3>Création</h3>
              <p>Votre créateur confectionne votre pièce unique avec passion</p>
            </div>
            <div className="step-card">
              <div className="step-number">04</div>
              <img
                src="/images/livraison.jpg"
                alt="Livraison à domicile"
                className="step-image"
              />
              <h3>Livraison</h3>
              <p>Recevez votre création unique directement chez vous</p>
            </div>
          </div>
        </section>
        <section className="contact">
          <div>
            <h3>Restez informé</h3>
            <p>
              Recevez les dernières nouvelles, créations et offres exclusives de
              notre entrepise
            </p>
          </div>
          <div className="newsletter-form">
            <input
              type="email"
              className="newsletter-input"
              placeholder="votre@email.com"
            />
            <Boutton
              text="S'abonner"
              icon={<LuMail />}
              color={"white"}
              backgroundColor={"Black"}
              largeur={"120px"}
            ></Boutton>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Accueil;
