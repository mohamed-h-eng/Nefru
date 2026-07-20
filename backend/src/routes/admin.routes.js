import express from "express";
const router = express.Router();
import {
    getDashboard,
    getAllUsers,
    getUserById,
    updateUserById,
    banUserById,
    unbanUserById,
    deleteUserById,
    validateId,
} from "../controllers/Admin/Admin.controller.js"

// Dashboard
router.get("/dashboard",getDashboard)
// router.get("/analytics",getAnalytics)
// router.get("/activity",getActivity)

// User Management
router.get("/users",getAllUsers)
router.get("/users/:id",validateId,getUserById)

router.patch("/users/:id",validateId,updateUserById)
router.patch("/users/:id/ban",validateId,banUserById)
router.patch("/users/:id/unban",validateId,unbanUserById)

router.delete("/users/:id",validateId,deleteUserById)

// Guide Management
router.get("/api/admin/guides",controller)
router.get("/api/admin/guides/pending",controller)
router.get("/api/admin/guides/:id",controller)

router.patch("/api/admin/guides/:id/approve",controller)
router.patch("/api/admin/guides/:id/reject",controller)
router.patch("/api/admin/guides/:id/suspend",controller)


export default router;
