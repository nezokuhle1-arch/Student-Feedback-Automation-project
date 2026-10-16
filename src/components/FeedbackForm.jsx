import { useState } from "react";
import { validateFeedback } from "../utils/validate";
import { submitFeedback } from "../services/submitFeedback";

const EMPTY_FORM = {
  studentName: "",
  email: "",
  courseName: "",
  rating: "",
  message: "",
};

export default function FeedbackForm() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear that field's error as soon as the user starts fixing it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setServerMessage("");

    const validationErrors = validateFeedback(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    try {
      await submitFeedback({
        studentName: values.studentName.trim(),
        email: values.email.trim(),
        courseName: values.courseName.trim(),
        rating: Number(values.rating),
        message: values.message.trim(),
      });
      setStatus("success");
      setServerMessage("Thank you for your feedback! Your response has been received successfully.");
      setValues(EMPTY_FORM);
    } catch (error) {
      setStatus("error");
      setServerMessage(error.message || "Something went wrong. Please try again.");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form className="feedback-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="studentName">Student Name</label>
        <input
          id="studentName"
          name="studentName"
          type="text"
          value={values.studentName}
          onChange={handleChange}
          aria-invalid={Boolean(errors.studentName)}
          placeholder="e.g. Thandi Mokoena"
        />
        {errors.studentName && <p className="error-text">{errors.studentName}</p>}
      </div>

      <div className="field">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          placeholder="you@example.com"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="field">
        <label htmlFor="courseName">Course Name</label>
        <input
          id="courseName"
          name="courseName"
          type="text"
          value={values.courseName}
          onChange={handleChange}
          aria-invalid={Boolean(errors.courseName)}
          placeholder="e.g. Full Stack Development"
        />
        {errors.courseName && <p className="error-text">{errors.courseName}</p>}
      </div>

      <fieldset className="field rating-field">
        <legend>Rating</legend>
        <div className="rating-options">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="rating-option">
              <input
                type="radio"
                name="rating"
                value={n}
                checked={values.rating === String(n)}
                onChange={handleChange}
              />
              <span>{n}</span>
            </label>
          ))}
        </div>
        <p className="hint">1 = Poor, 5 = Excellent</p>
        {errors.rating && <p className="error-text">{errors.rating}</p>}
      </fieldset>

      <div className="field">
        <label htmlFor="message">Feedback Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          placeholder="Tell us about your experience..."
        />
        {errors.message && <p className="error-text">{errors.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </button>

      {status === "success" && (
        <div className="banner banner-success" role="status">{serverMessage}</div>
      )}
      {status === "error" && (
        <div className="banner banner-error" role="alert">{serverMessage}</div>
      )}
    </form>
  );
}