import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ChangePassword from "./pages/auth/ChangePassword";
import Destinations from "./pages/destinations/Destinations";
import DestinationDetail from "./pages/destinations/DestinationDetail";
import CreateDestination from "./pages/destinations/CreateDestination";
import MyDestinations from "./pages/destinations/MyDestinations";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDestinations from "./pages/admin/AdminDestinations";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ChatBot from "./components/chat/ChatBot";
import "./App.css";
import AdminDestinationDetail from "./pages/admin/AdminDestinationDetail";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/change-password"
                  element={
                    <ProtectedRoute>
                      <ChangePassword />
                    </ProtectedRoute>
                  }
                />
                <Route path="/destinations" element={<Destinations />} />
                <Route
                  path="/destinations/:id"
                  element={<DestinationDetail />}
                />
                <Route
                  path="/create-destination"
                  element={
                    <ProtectedRoute>
                      <CreateDestination />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-destinations"
                  element={
                    <ProtectedRoute>
                      <MyDestinations />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/destinations"
                  element={
                    <ProtectedRoute>
                      <AdminDestinations />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/destinations-detail/:id"
                  element={<AdminDestinationDetail />}
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <ChatBot />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
