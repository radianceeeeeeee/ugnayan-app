import { Link } from "react-router-dom";
import { adminNavigation } from "./AdminConstants";
import "./AdminNavigation.css"

interface AdminTableProps{
  view: string | undefined;
}
const AdminNavigation = ({view}: AdminTableProps) => {
  console.log(view);
  return (
    <ul className="chec nav nav-tabs">
      {adminNavigation.map((item) => {
        const style = item.url === view ? { backgroundColor: 'white' } : {};

        return (
          <li className="nav-item" key={item.id} style={style}>
            <Link className="nav-link" to={`/admin/${item.url}`}>
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default AdminNavigation;
