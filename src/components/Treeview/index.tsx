/* eslint-disable @typescript-eslint/no-explicit-any */
/* Treeview component */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Components
import API from "../../api/v1";
import Loading from "../Loading";

/* CSS */
import "./index.css";

/* Icons */
import iconFolders from "../../assets/icons/folders.svg";
import iconDir from "../../assets/icons/directory.svg";
import iconFile from "../../assets/icons/file.svg";

// Render treeview
const setLink = (node: any) => {
  // Vars
  const { isDirectory, id, name, children } = node;

  if (isDirectory) {
    // Directories
    return (
      <li key={id} className="directory">
        <div className="directory-name">
          <img src={iconDir} alt="Directory" /> {name}
        </div>
        <ol className="directories">{children.map(setLink)}</ol>
      </li>
    );
  } else {
    // Files
    return (
      <li key={id} className={`file file-${id}`}>
        <Link to={"/id/" + id}>
          <img src={iconFile} alt="File" /> {name}
        </Link>
      </li>
    );
  }
};

function Treeview(props: any) {
  const [fileTree, setFileTree] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Router navigate
  const navigate = useNavigate();

  useEffect(() => {
    
    // Check if delete file was passed
    if( props.delete ) {
      // Avoid reloding treeview
      // Remove element .app-editor-treeview file-{id}
      const element = document.querySelector(`.app-editor-files .file-${props.delete}`);
      if( element )  {
        // Remove element
        element.remove();
        // Navigate to home
        navigate("/");
      }
      return;
    } 

    // Api : Get file tree
    API.getFiletree()
      .then((data) => {
        // Set file tree data
        setFileTree(data);
      })
      .catch((error) => {
        // Set error
        setError("Error reading file tree");
        console.error("File tree error", error);
      });
  }, [props]);

  // Return treeview
  return (
    // Treeview
    <div className="app-editor-files">
      <h2>
        <img src={iconFolders} alt="Folders" /> Files
      </h2>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <ol>
          {(fileTree && fileTree.map((node: any) => setLink(node))) || (
            <Loading />
          )}
        </ol>
      )}
    </div>
  );
}

export default Treeview;
