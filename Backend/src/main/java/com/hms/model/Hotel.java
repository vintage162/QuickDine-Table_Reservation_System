package com.hms.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="hotels")
public class Hotel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long hotelId;
	private String hotelName;
	private String hotelOwnerName;
	private String OwnerMobileNo;
	private String hotelNumber;
	private String hoteLocation;
	private String hotelType;
	private String imgUrl;
	
	@Column(unique = true)
	private String adminEmail;
	private String adminPassword;
	
	
	
	
	
	
	public Hotel() {
		super();
	}

	public Hotel( String hotelName, String hotelOwnerName, String ownerMobileNo, String hotelNumber,
			String hoteLocation, String hotelType, String imgUrl, String adminEmail, String adminPassword) {
		super();
		
		this.hotelName = hotelName;
		this.hotelOwnerName = hotelOwnerName;
		OwnerMobileNo = ownerMobileNo;
		this.hotelNumber = hotelNumber;
		this.hoteLocation = hoteLocation;
		this.hotelType = hotelType;
		this.imgUrl = imgUrl;
		this.adminEmail = adminEmail;
		this.adminPassword = adminPassword;
	}

	public long getHotelId() {
		return hotelId;
	}
	public void setHotelId(long hotelId) {
		this.hotelId = hotelId;
	}
	public String getHotelName() {
		return hotelName;
	}
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	public String getHotelOwnerName() {
		return hotelOwnerName;
	}
	public void setHotelOwnerName(String hotelOwnerName) {
		this.hotelOwnerName = hotelOwnerName;
	}
	public String getOwnerMobileNo() {
		return OwnerMobileNo;
	}
	public void setOwnerMobileNo(String ownerMobileNo) {
		OwnerMobileNo = ownerMobileNo;
	}
	public String getHotelNumber() {
		return hotelNumber;
	}
	public void setHotelNumber(String hotelNumber) {
		this.hotelNumber = hotelNumber;
	}
	public String getHoteLocation() {
		return hoteLocation;
	}
	public void setHoteLocation(String hoteLocation) {
		this.hoteLocation = hoteLocation;
	}
	public String getHotelType() {
		return hotelType;
	}
	public void setHotelType(String hotelType) {
		this.hotelType = hotelType;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	public String getAdminEmail() {
		return adminEmail;
	}
	public void setAdminEmail(String adminEmail) {
		this.adminEmail = adminEmail;
	}
	public String getAdminPassword() {
		return adminPassword;
	}
	public void setAdminPassword(String adminPassword) {
		this.adminPassword = adminPassword;
	}
	
	
	
	
}
