import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import authorStore from "../stores/authorStore";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";
import { loadAuthors } from "../actions/authorActions";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    courseStore.addChangeListener(onCoursesChange);
    const slug = props.match.params.slug;
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      const _course = courseStore.getCourseBySlug(slug);
      if (_course === undefined) {
        props.history.push("/not-found");
        return;
      }
      setCourse(_course);
    }
    return () => courseStore.removeChangeListener(onCoursesChange);
  }, [props.history, courses.length, props.match.params.slug]);

  useEffect(() => {
    authorStore.addChangeListener(onAuthorsChange);
    if (authors.length === 0) {
      loadAuthors();
    }
    return () => authorStore.removeChangeListener(onAuthorsChange);
  }, [authors.length]);

  function onCoursesChange() {
    setCourses(courseStore.getCourses());
  }

  function onAuthorsChange() {
    setAuthors(authorStore.getAuthors());
  }

  function handleChange({ target }) {
    const updatedCourse = {
      ...course,
      [target.name]: target.value,
    };
    setCourse(updatedCourse);
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.category) _errors.category = "Category is required";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved.");
    });
  }
  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        authors={authors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
