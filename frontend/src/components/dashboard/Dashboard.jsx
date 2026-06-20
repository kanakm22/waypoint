import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";


const Dashboard = () => {

  const [repos, setRepos] = useState([]);
  var [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepos, setSuggestedRepos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // for data fetching
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepos = async () => {
      try {
        const res = await fetch(`http://localhost:3002/repo/user/${userId}`);

        const data = await res.json();
        setRepos(data.repos);
      } catch (err) {
        console.error("error while fetching repositories!");
      }
    }

    const fetchSuggestedRepos = async () => {
      try {
        const res = await fetch(`http://localhost:3002/repo/all`);

        const data = await res.json();
        setSuggestedRepos(data);

      } catch (err) {
        console.error("error while fetching repositories!");
      }
    }

    fetchRepos();
    fetchSuggestedRepos();
  }, [])

  // search queries
  useEffect(() => {
    if (searchQuery = "") {
      setSearchResults(repos);
    } else {
      const filteredRepos = repos.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filteredRepos);
    }

  }, [searchQuery, suggestedRepos]);

  return (
    <>
      <Navbar />
      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>
          {suggestedRepos.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })}
        </aside>
        <main>
          <h2>Your Repositories</h2>
          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchResults.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })}
        </main>
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Developer Meetup - Dec 25</p>
            </li>
            <li>
              <p>React Summit - Jan 5</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
}

export default Dashboard;