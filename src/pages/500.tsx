
export default function Custom500() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
      <h1 className="text-4xl font-bold mb-4">500 - Server Error</h1>
      <p className="text-xl mb-8">Lo sentimos, ha ocurrido un error en el servidor.</p>
      <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        Volver al inicio
      </a>
    </div>
  );
}
