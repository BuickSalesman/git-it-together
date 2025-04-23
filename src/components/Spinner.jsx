export default function Spinner({ text }) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="spinner mb-4" /> {/* define your CSS animation */}
        <p className="text-lg">{text}</p>
      </div>
    </div>
  );
}
