import { Link } from "react-router-dom";
import Home from './../pages/Home';
import About from './../pages/About';

export default function Navbar() {
  return (
    <nav className="border-b-4 border-green-700 text-center fixed top-0 bg-green-600 font-bold w-full text-lg text-white">
      <ul>
        <li className="inline-block py-4">
            <Link to="/" className="x`pl-6 pr-8">Home</Link>
        </li>
        <li className="inline-block py-4">
            <Link to="/about" className="x`pl-6 pr-8">About</Link>
        </li>
        <li className="inline-block py-4">
            <Link to="/articles-list" className="x`pl-6 pr-8">Articles</Link>
        </li>
        
      </ul>
    </nav>
  )
}
