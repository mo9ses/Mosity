import { BrowserRouter } from "react-router-dom";

import { About, Hero, Works } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Hero />
        </div>
        <About />
        <Works />
      </div>
    </BrowserRouter>
  );
}

export default App;