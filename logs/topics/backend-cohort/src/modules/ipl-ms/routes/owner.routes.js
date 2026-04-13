import { Router } from "express";
import * as controller from "../controllers/owner.controller.js";

const router = Router();

// CREATE a new owner
router.post("/", controller.createOwner);

// Get all owners
router.get("/", controller.getAllOwners);

// get owner by id
router.get("/:id", controller.getOwnerById);

// update owners - demands all field
router.put("/:id", controller.updateOwner);

// delete owner
router.delete("/:id", controller.deleteOwner);

export default router;
