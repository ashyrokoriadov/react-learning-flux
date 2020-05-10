import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import authorStore from "../stores/authorStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";
import { loadAuthors } from "../actions/authorActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    courseStore.addChangeListener(onCoursesChange);

    if (courseStore.getCourses().length === 0) loadCourses();

    return () => {
      courseStore.removeChangeListener(onCoursesChange);
    };
  }, []);

  useEffect(() => {
    authorStore.addChangeListener(onAuthorsChange);

    if (authorStore.getAuthors().length === 0) loadAuthors();

    return () => {
      authorStore.addChangeListener(onAuthorsChange);
    };
  }, []);

  function onCoursesChange() {
    setCourses(courseStore.getCourses());
  }

  function onAuthorsChange() {
    setAuthors(authorStore.getAuthors());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList
        courses={courses}
        authors={authors}
        deleteCourse={deleteCourse}
      />
    </>
  );
}

export default CoursesPage;
