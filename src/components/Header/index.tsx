/* Header component */

/* CSS */
import './index.css';

/* Images */
import logo from '../../assets/logo.svg';

/* Props */
interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <div className="app-header">
    <h1>{title || "Editor"}</h1>
    <img src={logo} alt="Company Logo" />
  </div>
);

export default Header;
