import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AppRoutes from "./router/AppRoutes";

const App = () => {
	return (
		<div className="flex flex-col min-h-screen">

			{/* Site Header */}
			<Navbar />

			{/* Main Content Area */}
			<main className="flex-grow">
				{/* Add padding-top to prevent content hiding behind sticky Navbar */}
				<AppRoutes />
			</main>

			{/* Site Footer */}
			<Footer />

		</div>
	);
};

export default App;
