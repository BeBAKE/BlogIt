import { Outlet } from "react-router-dom";

import QuoteForm from "../components/Form/QuoteForm"
import 'react-toastify/dist/ReactToastify.css';

const Landing = () => {

  return (
  <section 
    id="container" 
    className="flex flex-row h-full">
    <Outlet/>
    <QuoteForm/>

  </section>
  )
}


export default Landing