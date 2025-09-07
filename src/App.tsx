import { Provider } from "react-redux";
// import AppRoutes from "./features/routes/app-routes";
import { store } from "./redux/store";
import PortfolioTable from "./components/portforlio-table";

const App = () => {
  return (
    <Provider store={store}>
      {/* <AppRoutes />
       */}

      <PortfolioTable />
    </Provider>
  );
};

export default App;
