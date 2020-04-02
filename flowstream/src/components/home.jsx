import React from "react";
import product from "../assets/product.png";

function Home() {
  return (
    <div className="Home">
      <div>
        <h1>Flowmix</h1>
        <p>Our latest and greatest audio interface/mixerboard</p>

        <img src={product} alt="flowstream product" />

        <button>Read more</button>
      </div>
    </div>
  );
}

export default Home;
