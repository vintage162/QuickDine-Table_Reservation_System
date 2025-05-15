package com.hms.Controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.hms.Service.HotelService;
import com.hms.Service.FileService;
import com.hms.model.Hotel;

@RestController
@RequestMapping("/hotel")
@CrossOrigin(origins = "http://localhost:3000")  // Allow cross-origin for React frontend
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @Autowired
    private FileService fileService;

    @PostMapping(value = "/register", consumes = {"multipart/form-data"})
    public ResponseEntity<String> saveHotel(
            @RequestParam("hotelName") String hotelName,
            @RequestParam("hotelOwnerName") String hotelOwnerName,
            @RequestParam("ownerMobileNo") String ownerMobileNo,
            @RequestParam("hotelNumber") String hotelNumber,
            @RequestParam("hoteLocation") String hoteLocation,
            @RequestParam("hotelType") String hotelType,
            @RequestParam("adminEmail") String adminEmail,
            @RequestParam("adminPassword") String adminPassword,
            @RequestParam("image") MultipartFile image) {

        try {
            // Save image and get the path
            String imagePath = fileService.saveFile(image);

            // Create and save hotel
            Hotel hotel = new Hotel();
            hotel.setHotelName(hotelName);
            hotel.setHotelOwnerName(hotelOwnerName);
            hotel.setOwnerMobileNo(ownerMobileNo);
            hotel.setHotelNumber(hotelNumber);
            hotel.setHoteLocation(hoteLocation);
            hotel.setHotelType(hotelType);
            hotel.setAdminEmail(adminEmail);
            hotel.setAdminPassword(adminPassword);
            hotel.setImgUrl(imagePath);  // Image path saved in the hotel object

            hotelService.addHotel(hotel);
            return ResponseEntity.ok("Hotel " + hotelName + " registered successfully!");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering hotel");
        }
    }

    // Get all hotels
    @GetMapping("/all")
    public ResponseEntity<List<Hotel>> getAllHotels() {
        return ResponseEntity.ok(hotelService.getAllHotels());
    }

    // Update hotel details (excluding image)
    @PutMapping("/{id}")
    public ResponseEntity<Hotel> updateHotel(@PathVariable Long id, @RequestBody Hotel updatedHotel) {
        Hotel hotel = hotelService.updateHotel(id, updatedHotel);
        return ResponseEntity.ok(hotel);
    }

    // Delete a hotel by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHotel(@PathVariable("id") Long id) {
        try {
            hotelService.deleteHotel(id);
            return ResponseEntity.ok("Hotel deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting hotel");
        }
    }
}
