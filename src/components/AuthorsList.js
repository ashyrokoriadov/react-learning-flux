import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AuthorsList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {props.authors.map((author) => {
          return (
            <tr key={author.id}>
              <td></td>
              <td>
                <Link to={"/author/" + author.id + "/" + author.name}>
                  {author.name}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

AuthorsList.propTypes = {
  //deleteCourse: PropTypes.func.isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AuthorsList;
