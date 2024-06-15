import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" bg-white dark:bg-dark text-dark dark:text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Travel Go</h2>
            <p>
              Plan your trip with confidence. We’re here to help you plan and
              book your next trip with Travel Go. Search for flights, hotels,
              and beautiful locations all in one place.
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <Link to="/flights" className="hover:text-gray-400">
                  Flights
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/places" className="hover:text-gray-400">
                  Locations
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="hover:text-gray-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link to="#" className="hover:text-gray-400">
                <FaFacebook size={24} />
              </Link>
              <Link to="#" className="hover:text-gray-400">
                <FaTwitter size={24} />
              </Link>
              <Link to="#" className="hover:text-gray-400">
                <FaInstagram size={24} />
              </Link>
              <Link to="#" className="hover:text-gray-400">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p>Email: info@travelgo.com</p>
            <p>Phone: +1 123 456 7890</p>
            <p>Address: 123 Travel Street, Wanderlust City, TX 12345</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; 2024 Travel Go. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
