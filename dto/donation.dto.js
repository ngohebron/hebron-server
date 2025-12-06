


function donationDTO(donation){
    
const donor = donation.donner || donation.donor || {};

  return {
    donation_id:donation.donation_id,
    amount:donation.amount,
    currency:donation.currency,
    message:donation.message,
    status:donation.status,
    created_at:donation.created_at,
    updated_at:donation.updated_at,

    donor:{
       id: donor.doner_id,
      name: donor.full_name,
      email: donor.email,
      phone: donor.phone
    }
  }
}

function donationListDTO(list){
    return list.map((item) => donationDTO(item));
}

module.exports = {
    donationDTO,
    donationListDTO
}
