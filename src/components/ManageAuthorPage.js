import React, { useState, useEffect } from "react";
import AuthorForm from "./AuthorForm";
import authorStore from "../stores/authorStore";
import { toast } from "react-toastify";
import * as authorActions from "../actions/authorActions";

const ManageAuthorPage = (props) => {
  const [errors, setErrors] = useState({});
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [author, setAuthor] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    authorStore.addChangeListener(onAuthorsChange);
    const id = props.match.params.id;
    const name = props.match.params.name;
    if (authors.length === 0) {
      authorActions.loadAuthors();
    } else if (id) {
      setAuthor({
        id: id,
        name: name,
      });
    }
    return () => authorStore.removeChangeListener(onAuthorsChange);
  }, [authors.length, props.match.params.id, props.match.params.name]);

  function onAuthorsChange() {
    setAuthors(authorStore.getAuthors());
  }

  function handleChange({ target }) {
    const updatedAuthor = {
      ...author,
      [target.name]: target.value,
    };
    setAuthor(updatedAuthor);
  }

  function formIsValid() {
    const _errors = {};

    if (!author.name) _errors.name = "Name is required";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    authorActions.saveAuthor(author).then(() => {
      props.history.push("/authors");
      toast.success("Author saved.");
    });
  }

  return (
    <>
      <h2>Manage Author</h2>
      <AuthorForm
        errors={errors}
        author={author}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageAuthorPage;
