package com.hms.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hms.CustomExeption.DuplicateEmailException;
import com.hms.CustomExeption.ResourceNotFoundException;
import com.hms.model.Hotel;
import com.hms.repository.HotelRepository;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepo;

    public String addHotel(Hotel hotel) {
        Hotel newHotel = new Hotel(
            hotel.getHotelName(),
            hotel.getHotelOwnerName(),
            hotel.getOwnerMobileNo(),
            hotel.getHotelNumber(),
            hotel.getHoteLocation(),
            hotel.getHotelType(),
            hotel.getImgUrl(),
            hotel.getAdminEmail(),
            hotel.getAdminPassword()
        );
        hotelRepo.save(newHotel);
        return newHotel.getHotelName();
    }

    public List<Hotel> getAllHotels() {
        return hotelRepo.findAll();
    }

    public ResponseEntity<String> deleteHotel(Long id) {
        Optional<Hotel> hotel = hotelRepo.findById(id);
        if (hotel.isPresent()) {
            hotelRepo.deleteById(id);
            return ResponseEntity.ok("Hotel deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Hotel not found");
        }
    }

    public Hotel updateHotel(Long id, Hotel hotelDetails) {
        // Fetch existing hotel by ID
        Hotel hotel = hotelRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + id));

        // If email has changed, check for duplication
        if (!hotel.getAdminEmail().equals(hotelDetails.getAdminEmail())) {
            Optional<Hotel> existingHotel = hotelRepo.findByAdminEmail(hotelDetails.getAdminEmail());
            if (existingHotel.isPresent()) {
                throw new DuplicateEmailException("Email is already in use");
            }
        }

        // Update all the fields
        hotel.setHotelName(hotelDetails.getHotelName());
        hotel.setHotelOwnerName(hotelDetails.getHotelOwnerName());
        hotel.setOwnerMobileNo(hotelDetails.getOwnerMobileNo());
        hotel.setHotelNumber(hotelDetails.getHotelNumber());
        hotel.setHoteLocation(hotelDetails.getHoteLocation());
        hotel.setHotelType(hotelDetails.getHotelType());
        hotel.setImgUrl(hotelDetails.getImgUrl());
        hotel.setAdminEmail(hotelDetails.getAdminEmail());
        hotel.setAdminPassword(hotelDetails.getAdminPassword());

        return hotelRepo.save(hotel); // This will update the existing record
    }

    // Fetch hotel by its ID
    public Hotel getHotelById(long hotelId) {
        return hotelRepo.findById(hotelId)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + hotelId));
    }
}
