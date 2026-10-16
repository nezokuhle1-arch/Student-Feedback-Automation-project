const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateFeedback(values) {
  const errors = {};

  if (!values.studentName.trim()) {
    errors.studentName = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.courseName.trim()) {
    errors.courseName = "Please enter the course name.";
  }

  const rating = Number(values.rating);
  if (!values.rating) {
    errors.rating = "Please choose a rating from 1 to 5.";
  } else if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.rating = "Rating must be a whole number between 1 and 5.";
  }

  if (!values.message.trim()) {
    errors.message = "Please write your feedback.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Feedback should be at least 10 characters.";
  }

  return errors;
}