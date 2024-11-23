import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminMenu, UserMenu } from "../data/data";
import { useSelector } from "react-redux";
import Badge from "./Badge";

function Layout({ children }) {
  const { user } = useSelector((state) => state.user);
	const location = useLocation();
	const navigate = useNavigate();

	function handleLogout() {
		localStorage.clear();
		alert("Logged out");
		navigate("/login");
	}

	const SidebarMenu = user?.isAdmin ? AdminMenu : UserMenu;

	return (
		<div className="h-screen flex bg-gray-100">
			{/* Sidebar */}
			<div className="w-64 bg-blue-900 text-white flex flex-col">
				<div className="py-4 px-6 bg-blue-800 shadow-md">
					<h1 className="text-2xl font-bold tracking-wide text-center">
						DOC-APP
					</h1>
				</div>
				<nav className="flex-1 mt-6">
					{SidebarMenu.map((menu) => (
						<Link
							to={menu.path}
							key={menu.path}
							className={`flex items-center px-6 py-3 transition-colors duration-300 ${
								location.pathname === menu.path
									? "bg-blue-700 text-white font-bold"
									: "hover:bg-blue-700 text-gray-300"
							}`}
						>
							<i className={`${menu.icon} mr-3`}></i>
							<span className="text-sm font-medium">{menu.name}</span>
						</Link>
					))}
					<div
						onClick={handleLogout}
						className="flex items-center px-6 py-3 transition-colors duration-300 hover:bg-blue-700 text-gray-300 cursor-pointer"
					>
						<i className="fa-solid fa-right-from-bracket mr-3"></i>
						<Link className="text-sm font-medium">Logout</Link>
					</div>
				</nav>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				{/* Header */}
				<div className="h-16 bg-white shadow-md flex items-center justify-between px-6">
					<h2 className="text-lg font-semibold">Header</h2>
					<div className="flex items-center gap-4">
						<Badge count={user?.notification.length} onClick={() => {navigate('/notification')}}>
							<div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 cursor-pointer">
								🛎️ {/* Replace with a custom SVG or emoji */}
							</div>
						</Badge>
						<Link
							to="/profile"
							className="text-gray-800 font-medium hover:text-blue-600 transition uppercase"
						>
							{user?.name}
						</Link>
					</div>
				</div>

				{/* Content */}
				<main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
			</div>
		</div>
	);
}

export default Layout;
