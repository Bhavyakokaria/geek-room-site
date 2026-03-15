"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export type TeamCategory = "Core" | "Heads" | "Tech" | "Publicity" | "Design" | "Management";

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  category: TeamCategory;
  photo: string;
  gmail: string;
  linkedin: string;
};

const getFilePath = () => path.join(process.cwd(), "data", "team.json");

export async function getMembers(): Promise<TeamMember[]> {
  try {
    const filePath = getFilePath();
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error: any) {
    console.error("Failed to fetch team members", error);
    return [];
  }
}

export async function addMember(memberData: Omit<TeamMember, "id">) {
  try {
    const filePath = getFilePath();
    const fileContent = await fs.readFile(filePath, "utf-8");
    const members: TeamMember[] = JSON.parse(fileContent);

    const newId = members.length > 0 ? Math.max(...members.map((m) => m.id)) + 1 : 1;
    const newMember: TeamMember = {
      id: newId,
      ...memberData,
    };

    members.push(newMember);

    await fs.writeFile(filePath, JSON.stringify(members, null, 2), "utf-8");

    revalidatePath("/team");
    revalidatePath("/admin/team");

    return { success: true };
  } catch (error: any) {
    console.error("Failed to add team member:", error);
    return { success: false, error: error.message };
  }
}

export async function updateMember(id: number, memberData: Partial<TeamMember>) {
  try {
    const filePath = getFilePath();
    const fileContent = await fs.readFile(filePath, "utf-8");
    const members: TeamMember[] = JSON.parse(fileContent);

    const index = members.findIndex((m) => m.id === id);
    if (index === -1) {
      return { success: false, error: "Member not found" };
    }

    members[index] = { ...members[index], ...memberData };

    await fs.writeFile(filePath, JSON.stringify(members, null, 2), "utf-8");

    revalidatePath("/team");
    revalidatePath("/admin/team");

    return { success: true };
  } catch (error: any) {
    console.error("Failed to update team member:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteMember(id: number) {
  try {
    const filePath = getFilePath();
    const fileContent = await fs.readFile(filePath, "utf-8");
    const members: TeamMember[] = JSON.parse(fileContent);

    const index = members.findIndex((m) => m.id === id);
    if (index === -1) {
      return { success: false, error: "Member not found" };
    }

    members.splice(index, 1);

    await fs.writeFile(filePath, JSON.stringify(members, null, 2), "utf-8");

    revalidatePath("/team");
    revalidatePath("/admin/team");

    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete team member:", error);
    return { success: false, error: error.message };
  }
}
