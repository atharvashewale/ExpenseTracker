function BottomSheet({ isOpen, onClose, children }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-2xl p-4 shadow-lg transform transition-transform duration-200 ${
          isOpen
            ? "translate-y-0 ease-in"
            : "translate-y-full ease-out"
        }`}
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
        {children}
      </div>
    </div>
  );
}

export default BottomSheet;