function Spinner() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin inline-block h-12 w-12 border-4 border-current border-t-transparent text-blue-500 rounded-full" role="status" aria-label="Loading"></div>
      </div>
    );
}
  
  export default Spinner;