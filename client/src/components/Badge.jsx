const Badge = ({ count, children, onClick }) => {
    return (
      <div className="relative inline-block cursor-pointer" onClick={onClick}>
        {children}
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {count}
          </span>
        )}
      </div>
    );
  };
  
  export default Badge;
  