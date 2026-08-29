import fs from 'fs/promises';

export async function deleteFile(filePath) {

    try {
        await fs.unlink(filePath);

    } catch (error) {
        if (error.code === "ENOENT") {
            console.log("File already deleted");
            return;
        }
        throw error;
    }
}