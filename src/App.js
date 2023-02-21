import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound/NotFound";
import Table from "./components/pages/Table/Table";
import Footer from "./components/views/Footer/Footer";
import Header from "./components/views/NavBar/Header";
import { fetchTables } from "./redux/tablesRedux";
import { fetchStatus } from "./redux/statusRedux";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTables())
    dispatch(fetchStatus())
  }, [dispatch])

  return (
    <Container className="d-flex flex-column vh-100">
      <Header />
      <div className="flex-fill">
        <Container className="h-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/table/:tableId" element={<Table />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </div>
      <Footer />
    </Container>
  );
}

export default App;
