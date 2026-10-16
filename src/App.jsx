import FeedbackForm from "./components/FeedbackForm";

export default function App() {
  return (
    <main className="page">
      <section className="card">
        <header className="card-header">
          <h1>Student Feedback</h1>
          <p>Tell us how your course is going. It only takes a minute.</p>
        </header>
        <FeedbackForm />
      </section>
    </main>
  );
}