import "../CSS/footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedinIn /></a>
        </div>
      </div>

      <p className="footer-copy">© 2025 TailorsConnect. Tous droits réservés.</p>
    </footer>
  );
}

export default Footer;
