/* eslint-disable react-refresh/only-export-components */
/* API interactions */

import axios from "axios";

// CONSTS
const API_URL = "https://my-json-server.typicode.com/open-veezoo/editor";
const CONFIGS = {
  headers: {
    accept: "application/json",
  },
};

// Error handler
const reportError = (error: unknown) => {
  console.error("API error", error);
  return [];
};

// File list
export const getFiletree = async () => {
  try {
    const response = await axios.get(`${API_URL}/filetree`, CONFIGS);
    return response?.data || [];
  } catch (error) {
    return reportError(error);
  }
};
// Get file
export const getFile = async (fileid: number) => {
  try {
    const response = await axios.get(`${API_URL}/files/${fileid}`);
    return response?.data || [];
  } catch (error) {
    return reportError(error);
  }
};
// Save file
export const saveFile = async (fileid: number, name:string, content: string) => {
  try {
    const response = await axios.put(`${API_URL}/files/${fileid}`, {
      id : fileid,
      name,
      content,
    });
    return response?.data || [];
  } catch (error) {
    return reportError(error);
  }
};
// Delete file
export const deleteFile = async (fileid: number) => {
  try {
    const response = await axios.delete(`${API_URL}/files/${fileid}`);
    return response?.data || [];
  } catch (error) {
    return reportError(error);
  }
};

// Export
export default {
  getFiletree,
  getFile,
  saveFile,
  deleteFile,
};
