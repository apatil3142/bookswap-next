"use client"

import React, { useCallback } from 'react';
import styles from './fileDragAndDrop.module.css';

interface IFileDragAndDropProps {
  onFileSelected: (file: File) => void;
}

const FileDragAndDrop: React.FC<IFileDragAndDropProps> = ({onFileSelected}) => {

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if(droppedFile){
      onFileSelected(droppedFile);
    }
  },[onFileSelected]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if(selectedFile){
      onFileSelected(selectedFile);
    }
  };

  return (
    <div className={styles.container} onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
      <p>Drag and Drop file here.</p>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-input"
      />
      <p>OR</p>
      <label htmlFor="file-input" className={styles.fileInputLabel}>
        Select File
      </label>
    </div>
  )
}

export default FileDragAndDrop
