package com.hms.Service;

import com.hms.model.Booking;
import com.hms.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // Method to save booking
    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    // Method to get bookings by hotelId
    public List<Booking> getBookingsByHotelId(long hotelId) {
        return bookingRepository.findByHotel_HotelId(hotelId);
    }
//    public List<Booking> getBookingsByCustomerId(Long customerId) {
//        return bookingRepository.findByCustomerId(customerId);
//    }

	public List<Booking> getAllBookings() {
		
		return bookingRepository.findAll();
	}
}
