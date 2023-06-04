const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {Array(15)
        .fill("")
        .map((element,index) => (
          <div key={index} className="shimmer-card"></div>
        ))}
    </div>
  );
};

export default Shimmer;
