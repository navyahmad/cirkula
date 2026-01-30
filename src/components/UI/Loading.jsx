const Loading = ({ message = "Loading...", fullScreen = true }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600 font-medium">{message}</p>
          <p className="text-sm text-gray-400 mt-1">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-purple-500 border-t-transparent mb-2"></div>
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  );
};

// Spinner kecil untuk inline loading
export const LoadingSpinner = ({ size = "md", color = "purple" }) => {
  const sizeClass = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-3",
    lg: "h-8 w-8 border-4"
  };

  const colorClass = {
    purple: "border-purple-500",
    blue: "border-blue-500",
    green: "border-green-500",
    red: "border-red-500"
  };

  return (
    <div className={`inline-block animate-spin rounded-full ${colorClass[color]} border-t-transparent ${sizeClass[size]}`}></div>
  );
};

// Loading untuk tabel
export const TableLoading = ({ colSpan = 1 }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-purple-500 border-t-transparent mb-2"></div>
        <p className="text-gray-600 text-sm">Loading data...</p>
      </td>
    </tr>
  );
};

export default Loading;