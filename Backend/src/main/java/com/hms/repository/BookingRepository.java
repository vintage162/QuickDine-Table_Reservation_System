package com.hms.repository;

import com.hms.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByHotel_HotelId(long hotelId);
 //List<Booking> findByCustomerId(Long customerId);
}
