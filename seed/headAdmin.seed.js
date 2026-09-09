import mongoose from "mongoose";
import { env } from "../src/config/env.js";
import { Permission } from "../src/mongoose/schemas/permission.js";
import { Role } from "../src/mongoose/schemas/role.js";
import { PERMISSIONS } from "../src/constants/permission.constant.js";

const humanize = (code) =>
    code
        .split("_")
        .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
        .join(" ");

const seedHeadAdmin = async () => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("Connected to DB:", env.MONGO_URI);

        // 1. Ensure all permissions from constant exist (upsert)
        for (const code of Object.values(PERMISSIONS)) {
            await Permission.findOneAndUpdate(
                { code },
                {
                    code,
                    name: humanize(code),
                    description: `Allows ${humanize(code).toLowerCase()}`,
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }
        console.log(`Ensured ${Object.values(PERMISSIONS).length} permissions from constant.`);

        // 2. Get the ids from permission collection (live DB)
        const allPermissions = await Permission.find({}, { _id: 1, code: 1 });
        const permissionIds = allPermissions.map((p) => p._id);
        console.log(`Fetched ${permissionIds.length} permission ids from DB:`, allPermissions.map((p) => p.code).join(", "));

        // 3. Create "Head Admin" if not exist, else update with new permissions
        const existing = await Role.findOne({ name: "Head Admin" });

        let role;
        if (!existing) {
            role = await Role.create({ name: "Head Admin", permissions: permissionIds });
            console.log(`Created Head Admin role: ${role._id} with ${role.permissions.length} permissions`);
        } else {
            // Update: ensure Head Admin has all current permissions (merge new ones)
            // Use $set to sync to full list (or $addToSet to only add missing)
            const mergedIds = [...new Set([...existing.permissions.map(String), ...permissionIds.map(String)])].map(
                (id) => new mongoose.Types.ObjectId(id)
            );
            const needsUpdate = mergedIds.length !== existing.permissions.length;

            if (needsUpdate) {
                role = await Role.findOneAndUpdate(
                    { name: "Head Admin" },
                    { permissions: mergedIds },
                    { new: true }
                ).populate("permissions");
                console.log(`Updated Head Admin: added ${mergedIds.length - existing.permissions.length} new permission(s). Total: ${role.permissions.length}`);
            } else {
                // Even if no new, ensure it has all (in case permissions were removed)
                if (existing.permissions.length !== permissionIds.length) {
                    role = await Role.findOneAndUpdate(
                        { name: "Head Admin" },
                        { permissions: permissionIds },
                        { new: true }
                    ).populate("permissions");
                    console.log(`Synced Head Admin permissions to ${role.permissions.length}`);
                } else {
                    role = await existing.populate("permissions");
                    console.log(`Head Admin already up-to-date with ${role.permissions.length} permissions`);
                }
            }
        }

        if (role.permissions[0]?.code) {
            console.log(`Head Admin permissions: ${role.permissions.map((p) => p.code).join(", ")}`);
        }

        await mongoose.disconnect();
        console.log("Seeding completed, disconnected.");
        process.exit(0);
    } catch (error) {
        console.error("Head Admin seeding failed:", error);
        try {
            await mongoose.disconnect();
        } catch {}
        process.exit(1);
    }
};

seedHeadAdmin();
