// lib/videoUtils.ts

export const saveVideoToLocalStorage = (videoBlob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64data = reader.result as string;
      try {
        localStorage.setItem("savedVideo", base64data);
        resolve(base64data);
      } catch (error) {
        console.error("Error saving video to localStorage:", error);
        alert(
          "Failed to save video. The recording is likely too large for localStorage (limit is ~5MB)."
        );
        reject(error);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(videoBlob);
  });
};

export const loadVideoFromLocalStorage = (): string | null => {
  return localStorage.getItem("savedVideo");
};

export const deleteVideoFromLocalStorage = (): void => {
  localStorage.removeItem("savedVideo");
};
