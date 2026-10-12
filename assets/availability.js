'use strict';

// Change either value and commit this file to update the published site.
// Keep the matching product visibility/inventory in Optix in sync as well.
window.ATRIUM_AVAILABILITY = {
  privateOfficeBooking: false,
  privateOfficeDayPass: false,
};

const availability = window.ATRIUM_AVAILABILITY;
document.documentElement.dataset.privateOfficeBooking = availability.privateOfficeBooking ? 'available' : 'unavailable';
document.documentElement.dataset.privateOfficeDayPass = availability.privateOfficeDayPass ? 'available' : 'unavailable';
