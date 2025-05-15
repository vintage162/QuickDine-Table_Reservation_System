package com.hms.Controller;

import com.hms.model.Booking;
import com.hms.model.Hotel;
import com.hms.Service.BookingService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }
//to save
    @PostMapping("/save")
    public ResponseEntity<Booking> saveBooking(@RequestBody Booking booking) {
        if (booking.getHotel() == null || booking.getHotel().getHotelId() == 0) {
            return ResponseEntity.badRequest().build();
        }
        booking.setBookingStatus("Waiting"); 
        Booking savedBooking = bookingService.saveBooking(booking);
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }

    
    @GetMapping("/hotel/{hotelId}/bookings")
    public ResponseEntity<List<Booking>> getBookingsByHotelId(@PathVariable("hotelId") String hotelId) {
        try {
            long id = Long.parseLong(hotelId);  
          
            List<Booking> bookings = bookingService.getBookingsByHotelId(id);
            return ResponseEntity.ok(bookings);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(null); 
        }
    }
    
    
    @GetMapping("/hotel/AllBookings")
    public List<Booking> getAllHotels() {
        return bookingService.getAllBookings();
    }
    
    
    
//    @GetMapping("/customer/{customerId}")
//    public List<Booking> getBookingsByCustomer(@PathVariable Long customerId) {
//        return bookingService.getBookingsByCustomerId(customerId);
//    }

    
}
