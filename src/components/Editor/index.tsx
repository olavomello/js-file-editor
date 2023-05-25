/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Components
import API from "../../api/v1";
import Loading from "../Loading";

/* CSS */
import "./index.css";

/* Assets */
import iconFile from "../../assets/icons/file.svg";
import iconSave from "../../assets/icons/save.svg";
import iconClose from "../../assets/icons/close.svg";
import iconDelete from "../../assets/icons/delete.svg";

function VeezooEditor(props: any) {
  // Loading
  const [loading, setLoading] = useState<boolean>(false);

  // File id
  const [fileId, setFileId] = useState<number>();
  const [fileName, setFileName] = useState<string>("");
  const [fileCode, setFileCode] = useState<string>("");

  // Router navigate
  const navigate = useNavigate();

  // File load
  const loadFile = async (fileId: number) => {
    if (!fileId) return;

    // File id passed
    if (props.file) {
      // Set loading
      setLoading(true);

      // Load file data
      const fileJson: any = await API.getFile(fileId);
      // File data
      const { id, name, content: code } = fileJson;

      // Set file data
      setFileId(id);
      setFileName(name);
      setFileCode(code);

      // Loading done
      setLoading(false);
    }
  };

  // File delete
  const deleteFile = async () => {
    // Check if file is selected
    if (!fileId) {
      toast.success("Please select a file to delete");
      return;
    }

    // Confirm delete
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!confirmDelete) return;

    // Delete file
    const response = await API.deleteFile(fileId);

    if (response) {
      // File deleted
      toast.success("File deleted !");
      // Clear file data
      clearFileData();
    }

    // Reload filetree
    props.reloadFiletree();
  };

  // File Close
  const closeFile = () => {
    // Clear file data
    clearFileData();
    // Navigate to home
    navigate("/");
  };

  // File save
  const saveFile = async () => {
    // Check if file is selected
    if (!fileId) {
      toast.error("Please select a file to save");
      return;
    }

    // Set loading
    setLoading(true);

    // Save file
    const response = await API.saveFile(fileId, fileName, fileCode);

    console.log("File save::::", response);

    if (response) {
      // File saved

      // Set loading
      setLoading(false);

      // User alert
      toast.success("File saved !");
    }
  };

  // Editor save data
  const onChange = useCallback((value: any) => {
    // Save file new data
    setFileCode(value);
  }, []);

  // Clear file data
  const clearFileData = () => {
    // Clear file data
    setFileId(0);
    setFileName("");
    setFileCode("");
  };

  // onload
  useEffect(() => {
    // File id passed
    if (props.file) {
      // Load file data
      loadFile(props.file);
    }
  }, [props]);

  // Loading
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="editor-component">
        {!fileId ? (
          <div className="editor-empty">Select a file to edit</div>
        ) : (
          <div className="code-editor-wrapper">
            <div className="code-editor-header">
              <div className="code-editor-file-name">
                <h3>
                  <img src={iconFile} /> {fileName}
                </h3>
              </div>
              <div className="code-editor-tools">
                <ol>
                  <li>
                    <button className="primary" onClick={saveFile}>
                      <img src={iconSave} /> Save
                    </button>
                  </li>
                  <li>
                    <button className="primary" onClick={closeFile}>
                      <img src={iconClose} /> Close
                    </button>
                  </li>
                  <li>
                    <button className="secondary" onClick={deleteFile}>
                      <img src={iconDelete} /> Delete
                    </button>
                  </li>
                </ol>
              </div>
            </div>
            <CodeMirror
              theme="light"
              value={fileCode || ""}
              height="100%"
              spellCheck={false}
              style={{ height: "100%" }}
              onChange={onChange}
              extensions={[java()]}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default VeezooEditor;
