package com.lingstar.lingstar.Service;

import java.util.List;
import java.util.Optional;

import com.lingstar.lingstar.Model.Reservation;
import com.lingstar.lingstar.Repository.ReservationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {
    
    @Autowired
    private ReservationRepository reservationRepo;

    public List<Reservation> findAll(){
        return (List<Reservation>)reservationRepo.findAll();
    }

    public Optional<Reservation> getReservation(Integer reservationId) {
        return reservationRepo.getReservation(reservationId);
    }

    public Reservation saveReservation(Reservation reservation) {
        if(reservation.getId() == null) {
            return reservationRepo.updateReservation(reservation);
        }else{
            return reservation;
        }
    }

    public Reservation updateReservation(Reservation reservation) {
        if(reservation.getId() != null) {
            Optional<Reservation> dbReservation = reservationRepo.getReservation(reservation.getId());
            if(dbReservation.get().getRoom() != null) {
                dbReservation.get().setRoom(reservation.getRoom());
            }
            if(dbReservation.get().getDateGetInto() != null) {
                dbReservation.get().setDateGetInto(reservation.getDateGetInto());
            }
            if(dbReservation.get().getDateGetOut() != null) {
                dbReservation.get().setDateGetOut(reservation.getDateGetOut());
            }
            reservationRepo.updateReservation(reservation);
            return dbReservation.get();
        }else{
            return reservation;
        }
    }

    public void deleteReservation(Integer reservationId) {
        reservationRepo.deleteReservation(reservationId);
    }
}
