"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const getSettingsPath = () => path.join(process.cwd(), "data", "settings.json");

export async function getSettings() {
  try {
    const data = await fs.readFile(getSettingsPath(), "utf-8");
    return JSON.parse(data);
  } catch (e) {
    // Return default settings if file doesn't exist
    return { hideJoin: true }; // Let's default to hidden
  }
}

export async function setHideJoin(hideJoin: boolean) {
  const dirPath = path.join(process.cwd(), "data");
  
  try {
    await fs.mkdir(dirPath, { recursive: true });
    
    let settings = await getSettings();
    settings.hideJoin = hideJoin;
    
    await fs.writeFile(getSettingsPath(), JSON.stringify(settings, null, 2));
    
    // Revalidate the entire site so layout and pages refresh
    revalidatePath("/", "layout");
    
    return settings.hideJoin;
  } catch (error) {
    console.error("Failed to save settings:", error);
    throw new Error("Failed to save settings");
  }
}
