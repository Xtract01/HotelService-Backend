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
export async function getAllHotels() {
  const hotels = await Hotel.findAll({
    where: {
      deletedAt: null,
    },
  });
  if (!hotels) {
    logger.error("No hotels found.");
    throw new NotFoundError("No hotels found.");
  }
  logger.info("Hotels retrieved successfully.", {
    count: hotels.length,
  });
  return hotels;
}

export async function softDeleteHotel(id: number) {
  const hotel = await Hotel.findByPk(id);
  if (!hotel) {
    logger.warn(`Hotel with id ${id} not found.`);
    throw new NotFoundError(`Hotel with id ${id} not found.`);
  }
  hotel.deletedAt = new Date();
  await hotel.save();
  logger.info("Hotel soft deleted successfully.", {
    id: hotel.id,
    name: hotel.name,
  });
  return hotel;
}

export async function updateHote(
  id: number,
  hotelData: Partial<createHotelDto>,
) {
  const hotel = await Hotel.findByPk(id);
  if (!hotel) {
    logger.warn(`Hotel with id ${id} not found.`);
    throw new NotFoundError(`Hotel with id ${id} not found.`);
  }
  hotel.name = hotelData.name || hotel.name;
  hotel.address = hotelData.address || hotel.address;
  hotel.location = hotelData.location || hotel.location;
  hotel.rating = hotelData.rating || hotel.rating;
  hotel.ratingCount = hotelData.ratingCount || hotel.ratingCount;
  await hotel.save();
  logger.info("Hotel updated successfully.", {
    id: hotel.id,
    name: hotel.name,
  });
  return hotel;
}
