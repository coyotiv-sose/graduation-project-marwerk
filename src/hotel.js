class Hotel {
  constructor(name, location, rooms) {
    this.name = name
    this.location = location
    this.rooms = rooms
    this.bookings = []
  }

  // Check if rooms are available on given range
  checkAvailability(checkIn, checkOut) {
    // Check if there are rooms available
    if (this.rooms <= 0) {
      return false
    }

    // Loop over each existing booking to check for date overlap
    for (let i = 0; i < this.bookings.length; i += 1) {
      const booking = this.bookings[i]

      // TODO: this checking of overlapping dates only makes sense if we have separate rooms, because in the current scenario
      // we have only one type of room, so while there are rooms available, we can have multiple bookings at the same time

      // check if the requested dates overlap with an existing booking
      if (checkIn < booking.checkOutDate && checkOut > booking.checkInDate) {
        return false
      }
    }

    // If there are rooms available and no overlap in dates, return true
    return true
  }

  decreaseAvailability() {
    if (this.rooms > 0) {
      this.rooms -= 1
    } else {
      console.log('All rooms are booked')
    }
  }

  static create({ name, location, rooms, bookings }) {
    console.log('Creating a new hotel...', { name, location, rooms, bookings })
    const hotel = new Hotel(name, location, rooms, bookings)

    Hotel.list.push(hotel)
    return hotel
  }

  static list = []

  // Method to cancel booking { once we incorporate IDs generated by our DB, we can revisit this method }

  // cancelBooking(email) {
  //   const bookingToCancel = booking => booking.guest.email === email
  //   const indexOfBookingToCancel = this.bookings.findIndex(bookingToCancel)

  //   const bookingWasFound = indexOfBookingToCancel !== -1

  //   if (bookingWasFound) {
  //     this.bookings.splice(indexOfBookingToCancel, 1)
  //     this.rooms += 1
  //   }

  //   console.log(`Booking for ${email} was ${bookingWasFound ? '' : 'not '}found`)
  // }
}

// ------------------------------------------------------------------------
module.exports = Hotel
