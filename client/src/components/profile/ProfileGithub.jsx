import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProfileGithub = (props) => {
  const [git, setGit] = useState({
    clientId: "062897f0c5f8fa20d6e1",
    clientSecret: "dd5042a9f3c7a884fc1df3a0ef0db039a220eb68",
    count: 5,
    sort: "created: asc",
    repos: [],
  });
  //when any prop changes this function will run to hit git api to fetch 5 latest repos
  useEffect(() => {
    const fetchData = async () => {
      const { username } = props;
      const { count, sort, clientId, clientSecret } = git;

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
        );
        const data = await response.json();

        if (data) {
          setGit((prevState) => ({
            ...prevState,
            repos: data,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const { repos } = git;
  const repoItems = repos.map((repo) => (
    <div key={repo.id} className="card card-body mb-2">
      <div className="row">
        <div className="col-md-6">
          <h4>
            <Link to={repo.html_url} className="text-info" target="_blank">
              {repo.name}
            </Link>
          </h4>
          <p>{repo.description}</p>
        </div>
        <div className="col-md-6">
          <span className="badge badge-info mr-1">
            Stars: {repo.stargazers_count}
          </span>
          <span className="badge badge-secondary mr-1">
            Watchers: {repo.watchers_count}
          </span>
          <span className="badge badge-success">Forks: {repo.forks_count}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <div ref="myRef">
      <hr />
      <h3 className="mb-4">Latest Github Repos</h3>
      {repoItems}
    </div>
  );
};

export default ProfileGithub;
