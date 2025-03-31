// src/App.jsx
import Notifications from "./components/Notifications";
import Roles from "./components/Roles";
import Status from "./components/Status";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Panel de Administración
      </h1>

      <div className="max-w-5xl mx-auto space-y-12">
        <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
            📩 Notificaciones
          </h2>
          <Notifications />
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
            👤 Roles
          </h2>
          <Roles />
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
            📘 Estados
          </h2>
          <Status />
        </section>
      </div>
    </div>
  );
}

export default App;
