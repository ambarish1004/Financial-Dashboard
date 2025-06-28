import DashboardLayout from "../components/DashboardLayout";
import TransactionsTable from "../components/TransactionsTable";

const TransactionsPage = () => {
  return (
    <DashboardLayout>
      <TransactionsTable />
    </DashboardLayout>
  );
};

export default TransactionsPage;
