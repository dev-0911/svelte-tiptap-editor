const api = "https://steam.buntod.com/api/ai/upload-image";

export const uploadImage = async (file: File) => {
    try {
        const validExtensions = ["jpeg", "jpg", "png", "gif", "bmp", "tiff"];

        const formData = new FormData();
        formData.append("file_data", file);
        const response = await fetch(api, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Assuming the CloudFront link you need is in the response data
        const cloudfrontLink = data.cloudfront; // Adjust this according to the actual response structure
        return cloudfrontLink;
        console.log("File uploaded successfully:", cloudfrontLink);
    } catch (errPayload: any) {
        const error = errPayload?.response?.data?.error || "Something went wrong";
        console.log(error);
    }
    return null;
};
