import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import WalletPage from "./pages/WalletPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import PersonalPage from "./pages/PersonalPage";
import MessagePage from "./pages/MessagePage";
import SettingPage from "./pages/SettingPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
