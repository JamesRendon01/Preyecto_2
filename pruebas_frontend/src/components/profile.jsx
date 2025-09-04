import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";

const Profile = () => {
  return (
    <Link
      to="/config_perfil"
      aria-label="Ir a configuración de perfil"
      className="text-black hover:text-gray-700 transition-colors"
    >
      <UserRound className="w-15 h-15" />
    </Link>
  );
};

export default Profile;
