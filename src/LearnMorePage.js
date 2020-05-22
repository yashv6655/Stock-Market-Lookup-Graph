import React from "react";
import { Link } from "react-router-dom";

export default function LearnMorePage() {
  return (
    <section className="section learn-section">
      <h1 className="section-title">Learn About Stocks and Terms</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
        accusantium. Commodi accusantium iusto laborum voluptatem at quidem
        inventore, cum dicta sapiente odio corporis veritatis dolore ullam.
        Numquam, voluptatem. Mollitia, ipsam sunt eius quibusdam alias
        praesentium nemo veritatis rerum delectus nulla natus totam aspernatur
        nostrum, pariatur optio vitae consequatur reiciendis molestiae!
      </p>
      <button className="learn-section-btn btn-dark btn">
        <Link to="/" className="btn btn-dark">
          Back Home
        </Link>
      </button>
    </section>
  );
}
