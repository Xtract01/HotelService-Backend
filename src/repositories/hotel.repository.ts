import Hotel from "../db/models/hotel";
import logger from "../config/logger.config";
import { createHotelDto } from "../dto/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";

export async function createHotel(hotelData: createHotelDto) {
  const hotel = await Hotel.create({
    name: hotelData.name,
    address: hotelData.address,
    location: hotelData.location,
    rating: hotelData.rating,
    ratingCount: hotelData.ratingCount,
  });
  logger.info("Hotel created successfully.", {
    id: hotel.id,
    name: hotel.name,
  });
  return hotel;
}
export async function getHotelById(id: number) {
  const hotel = await Hotel.findByPk(id);
  if (!hotel) {
    logger.warn(`Hotel with id ${id} not found.`);
    throw new NotFoundError(`Hotel with id ${id} not found.`);
  }
  logger.info("Hotel found.", {
    id: hotel.id,
    name: hotel.name,
  });
  return hotel;
}
