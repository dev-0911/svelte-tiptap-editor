// import { DragEvent, useCallback, useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { API } from "@/lib/api";

import type { DragEventHandler } from "svelte/elements";

export const useUploader = ({ onUpload }: { onUpload: (url: string) => void }) => {
    // const [loading, setLoading] = useState(false);
    let loading = false;

    const uploadFile = async (file: File) => {
        loading = true;
        try {
            // const url = await API.uploadImage(file);
            // onUpload(url);
        } catch (errPayload: any) {
            const error = errPayload?.response?.data?.error || "Something went wrong";
            // toast.error(error);
        }
        loading = false;
    };

    return { loading, uploadFile };
};

export const useFileUpload = () => {
    // const fileInput = useRef<HTMLInputElement>(null);
    // const handleUploadClick = () => {
    //     fileInput.current?.click();
    // };
    // return { ref: fileInput, handleUploadClick };
};

export const useDropZone = ({ uploader }: { uploader: (file: File) => void }) => {
    // const [isDragging, setIsDragging] = useState<boolean>(false);
    // const [draggedInside, setDraggedInside] = useState<boolean>(false);
    let isDragging = false;
    let draggedInside = false;

    // useEffect(() => {
    //     const dragStartHandler = () => {
    //         isDragging = true;
    //     };

    //     const dragEndHandler = () => {
    //         isDragging = false;
    //     };

    //     document.body.addEventListener("dragstart", dragStartHandler);
    //     document.body.addEventListener("dragend", dragEndHandler);

    //     return () => {
    //         document.body.removeEventListener("dragstart", dragStartHandler);
    //         document.body.removeEventListener("dragend", dragEndHandler);
    //     };
    // }, []);

    // (e: DragEvent<HTMLDivElement>) => {
    const onDrop = (e: any) => {
        draggedInside = false;
        if (e.dataTransfer.files.length === 0) {
            return;
        }

        const fileList = e.dataTransfer.files;

        const files: File[] = [];

        for (let i = 0; i < fileList.length; i += 1) {
            const item = fileList.item(i);
            if (item) {
                files.push(item);
            }
        }

        if (files.some((file) => file.type.indexOf("image") === -1)) {
            return;
        }

        e.preventDefault();

        const filteredFiles = files.filter((f) => f.type.indexOf("image") !== -1);

        const file = filteredFiles.length > 0 ? filteredFiles[0] : undefined;

        if (file) {
            uploader(file);
        }
    };

    const onDragEnter = () => {
        draggedInside = true;
    };

    const onDragLeave = () => {
        draggedInside = false;
    };

    return { isDragging, draggedInside, onDragEnter, onDragLeave, onDrop };
};
