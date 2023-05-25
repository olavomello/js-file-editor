// Main component
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

/* Components */
import Header from "./components/Header";
import Treeview from "./components/Treeview";
import VeezooEditor from "./components/Editor";

/* CSS */
import "./App.css";

function App() {
  // Get file id from url
  const location = useLocation();

  // States
  const [fileId, setFileId] = useState<number>(0);
  const [reloadFiletree, setFileTreeDelFile] = useState<number>(0);

  // Callback reload filetree
  const _reloadFiletree = () => {
    // Delete file from file tree // avoid reloading to reduce api calls
    setFileTreeDelFile(fileId);
  };

  useEffect(() => {
    // Set file id
    const id = location.pathname.split("/id/")[1];
    setFileId(parseInt(id));
  }, [location]);



  return (
    <div className="app">
      <>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              zIndex: 999999999,
            },
          }}
        />      
        <Header title={"Editor"} />
        <div className="app-editor">
          <div className="app-editor-treeview">
            <Treeview delete={reloadFiletree}/>
          </div>
          <div className="app-editor-wrapper">
            {(fileId && <VeezooEditor file={fileId} reloadFiletree={_reloadFiletree} />) || (
              <div className="editor-empty">Select a file to edit</div>
            )}
          </div>
        </div>
      </>
    </div>
  );
}

export default App;
