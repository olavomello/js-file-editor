// Loading component
/* CSS */
import "./index.css";

// Assets
import iconLoading from "../../assets/icons/loading.svg";

function Loading() {
  return (
    <div className="loading">
      <img src={iconLoading} />
      Loading...
    </div>
  );
}

export default Loading;
