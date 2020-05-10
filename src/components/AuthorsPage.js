import React, { useState, useEffect } from "react";
import authorStore from "../stores/authorStore";
import AuthorsList from "./AuthorsList";
import { Link } from "react-router-dom";
import { loadAuthors } from "../actions/authorActions";

function AuthorsPage() {
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    authorStore.addChangeListener(onAuthorsChange);

    if (authorStore.getAuthors().length === 0) loadAuthors();

    return () => {
      authorStore.addChangeListener(onAuthorsChange);
    };
  }, []);

  function onAuthorsChange() {
    setAuthors(authorStore.getAuthors());
  }

  return (
    <>
      <h2>Authors</h2>
      <Link className="btn btn-primary" to="/author">
        Add Author
      </Link>
      <AuthorsList authors={authors} />
    </>
  );
}

export default AuthorsPage;
