package com.lingstar.lingstar.Repository;

import java.util.List;
import java.util.Optional;

import com.lingstar.lingstar.Model.Reservation;
import com.lingstar.lingstar.Repository.Crud.ReservationCrudRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReservationRepository {
    
    @Autowired
    private ReservationCrudRepository reservCrudRepo;

    public List<Reservation> findAll(){
        return (List<Reservation>)reservCrudRepo.findAll();
    }

    public Optional<Reservation> getReservation(Integer reservationId) {
        return reservCrudRepo.findById(reservationId);
    }

    public Reservation getReservationId(Integer reservationId) {
        return reservCrudRepo.getById(reservationId);
    }

    public Reservation saveReservation(Reservation reservation) {
        return reservCrudRepo.save(reservation);
    }

    public Reservation updateReservation(Reservation reservation) {
        return reservCrudRepo.save(reservation);
    }

    public void deleteReservation(Integer reservationId) {
        reservCrudRepo.deleteById(reservationId);
    }
}
