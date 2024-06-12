import { Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler";
import { prisma } from "../../db";

export const houseController = asyncHandler(
  async (req: Request, res: Response) => {
    const { address, wifiPassword, ownerId, builtById } = req.body;
    console.log(address, wifiPassword, ownerId, builtById);
    if (!(address || wifiPassword || ownerId || builtById))
      throw { status: 400, message: "Please provie all fields" };

    const createdHouse = await prisma.house.create({
      data: {
        address,
        wifiPassword,
        ownerId,
        builtById,
      },
      include: { owner: true, builtBy: true },
    });
    return res.status(201).json(createdHouse);
  }
);
