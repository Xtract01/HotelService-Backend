import { createHotelDto } from "../dto/hotel.dto";
import {
  createHotel,
  getHotelById,
  getAllHotels,
} from "../repositories/hotel.repository";

const blockListedAddresses = [
  "123 Main St, New York, NY",
  "42 Sunset Boulevard, Los Angeles, CA",
];
export async function createHotelService(hotelData: createHotelDto) {
  if (blockListedAddresses.includes(hotelData.address)) {
    throw new Error("Hotel address is blocklisted.");
  }
  const hotel = await createHotel(hotelData);
  return hotel;
}
export async function getHotelByIdService(id: number) {
  const hotel = await getHotelById(id);
  return hotel;
}
export async function getAllHotelsService() {
  const hotels = await getAllHotels();
  return hotels;
}
