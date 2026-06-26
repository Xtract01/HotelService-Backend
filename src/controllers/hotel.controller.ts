import { Request, Response, NextFunction } from "express";
import {
  createHotelService,
  getHotelByIdService,
} from "../service/hotel.service";
export async function createHotelHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const hotelResponse = await createHotelService(req.body);
  res.status(201).json({
    message: "Hotel created successfully.",
    data: hotelResponse,
  });
}

export async function getHotelByIdHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const hotelResponse = await getHotelByIdService(Number(req.params.id));
  res.status(200).json({
    message: "Hotel retrieved successfully.",
    data: hotelResponse,
  });
}
